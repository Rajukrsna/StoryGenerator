import express from "express";
import mongoose from "mongoose";
import Story from "../models/Story.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//to get stories that user wrote!
router.get("/getUserStories", protect, async (req, res) => {
  try {
    const id = req.user._id; // ✅ Fix here
    //console.log(id);
    const stories = await Story.find({ author: id }); 
    //console.log("found stories", stories)
    // This returns an array
    res.json(stories);
  } catch (error) {
    console.error("Error encountered in getting stories by user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/** ✅ Create a New Story (Protected) */
router.post("/", protect, async (req, res) => {
  try {
    const { title, chapters , imageUrl} = req.body;
    //console.log(chapters)
    if (!title || !chapters) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
  // Optionally inject createdBy using logged-in user:
    const enrichedChapters = chapters.map((ch, index) => ({
      title: ch.title || `Chapter ${index + 1}`,
      content: ch.content,
      createdBy: req.user._id,
      createdAt: new Date(),
    }));

    const story = new Story({
      title,
      content: enrichedChapters,
      author: req.user._id,
      imageUrl,
    });
    const savedStory = await story.save();
    //console.log("my story", story);
    res.status(201).json(savedStory);
    }
    catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error creating story", error: error.message });
    }
});

/** ✅ Leaderboard API */
router.get("/leaderboard/:title", async (req, res) => {
  try {
    const title = req.params.title;
    //console.log("i got my title", title)
    const leaderboard = await User.aggregate([
      // Step 1: Unwind contributions array
      { $unwind: "$contributions" },

      // Step 2: Filter only the contributions matching the given title
      { $match: { "contributions.title": title } },

      // Step 3: Group by user _id and sum the score
      {
        $group: {
          _id: "$_id", // group by user id
          totalScore: { $sum: "$contributions.score" },
        },
      },

      // Step 4: Sort by totalScore descending
      { $sort: { totalScore: -1 } },

      // Step 5: Limit to top 10
      { $limit: 10 },
    ]);

    // Step 6: Populate user details
    const populatedLeaderboard = await User.populate(leaderboard, {
      path: "_id",
      select: "name profilePicture",
    });

    // Step 7: Send formatted response
    res.json(
      populatedLeaderboard.map((entry) => ({
        userId: entry._id._id,
        name: entry._id.name,
        profilePicture: entry._id.profilePicture,
        totalScore: entry.totalScore,
      }))
    );
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({
      message: "Error fetching leaderboard",
      error: error.message,
    });
  }
});


/** ✅ Get All Stories with Optional Search & Sorting */
router.get("/", async (req, res) => {
  try {
    const { search, sort } = req.query;
    //console.log("mera query",req.query)
    let filter = {};
     
    function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

if (search?.trim()) {
  const safeSearch = escapeRegex(search.trim());
  filter.$or = [
    { title: { $regex: safeSearch, $options: "i" } },
  ];
}


    let query = Story.find(filter).populate("author", "name profilePicture");

    if (sort === "latest") query = query.sort({ createdAt: -1 });
    else if (sort === "oldest") query = query.sort({ createdAt: 1 });
    else if (sort === "top") query = query.sort({ votes: -1 });

    const stories = await query.lean();
    
    res.json(stories);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching stories", error: error.message });
  }
});

/** ✅ Get a Single Story by ID */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Story ID format" });
    }
   const story = await Story.findById(id).populate("author", "name");
  // console.log("the story before",story)
   let user  = null;
   const populatedContent = await Promise.all(
    story.content.map(async (chapter) => {
     if (mongoose.Types.ObjectId.isValid(chapter.createdBy)) {

      user = await User.findById(chapter.createdBy).select("name");
      //console.log("hey",user)
    }
      return {
        ...chapter.toObject(),
        createdBy: user,
      };
  })
);
//console.log("after", populatedContent)
story.content = populatedContent;

    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching story", error: error.message });
  }
});

/** ✅ Update a Story (Protected) */
router.put("/:id", protect, async (req, res) => {
  try {
    console.log("dfdsfds")
    const { id } = req.params;
    const { content } = req.body;
    const { votes } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Story ID format" });
    }
    if ( !content) {
      return res
        .status(400)
        .json({ message: "Title or content required for update" });
    }
    const story = await Story.findById(id);    
    if (!story) return res.status(404).json({ message: "Story not found" });
      if (story.author.toString() !== req.user._id.toString()) {
    // Not author - add to pending requests
    const  newChapter = req.body.newChapter;
    console.log("these are the field of the new chapters", newChapter)
    if (!newChapter) {
      return res.status(400).json({ message: "Chapter data missing" });
    }
    if(!newChapter.title === "")
    {story.pendingChapters = story.pendingChapters || [];
    story.pendingChapters.push({
      ...newChapter,
      requestedBy: req.user._id,
      status: "pending",
    });
    //console.log("mera pending chapters",story.pendingChapters)
  }
  else{
     story.votes= votes||story.votes;
     story.content = content || story.content;
  }
    await story.save();
    return res.status(202).json({ message: "Chapter request sent to author for approval." });
  }
else{
    story.votes= votes||story.votes;
    story.content = content || story.content;
    const updatedStory = await story.save();
    res.json(updatedStory);
}
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating story", error: error.message });
  }
});

/** ✅ Delete a Story (Protected) */
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Story ID format" });
    }
    const story = await Story.findById(id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    await story.deleteOne();
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting story", error: error.message });
  }
});



export default router;
