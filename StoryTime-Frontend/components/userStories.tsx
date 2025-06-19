import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CardHorizontal } from "./ui/card";
import Image from "next/image";
import { getUserStories } from "@/api/storyApi"; // corrected path
import {approveStory,rejectStory} from "@/api/storyApi";
interface Contribution {
  title: string;
  score: number;
}
interface User {
  _id: string;
  name: string;
  profilePicture?: string;
  contributions?: Contribution[];  // ← updated from `Number` to `Contribution[]`

}
interface Chapter {
  _id?: string;
  title: string;
  content: string;
  likes: number;
 createdBy: string | User; // allow both types
  createdAt: string;
}
interface Author {
    id: string;
    name: string;
    bio: string;
    profileImage: string;
}

interface PendingChapter extends Chapter {
  requestedBy: string | User;
  status: "pending" | "approved" | "rejected";
}
interface Story {
    _id: string;
    title: string;
    content: Chapter[];
  pendingChapters: PendingChapter[]; // ✅ completed
    author: Author;
    votes: number;
    imageUrl: string;   
}

export default function UserStories() {
  const [stories, setStories] = useState<Story[]>([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedChapter, setSelectedChapter] = useState<{ title: string; content: string } | null>(null);
const userId= localStorage.getItem("userId") || undefined;
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const storiesData = await getUserStories();
        console.log("ofod", storiesData)
        if (storiesData) {
          setStories(storiesData);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);
  const handleApprove = async (storyId: string, chapterIndex: number, title: string) => {
  try {
    await approveStory(storyId, chapterIndex);
    alert("Chapter approved");

    const updatedStories = await getUserStories();
    setStories(updatedStories);

   
  } catch (err) {
    console.error(err);
    alert("Error approving chapter");
  }
};


const handleReject = async (storyId: string, chapterIndex: number) => {
  try {
    await rejectStory(storyId, chapterIndex)
    alert("Chapter rejected");
    const updatedStories = await getUserStories();
    setStories(updatedStories);
  } catch (err) {
    console.error(err);
    alert("Error rejecting chapter");
  }
};

return (
  <>
    <div className="grid gap-6">
      {stories.map((story) => {
        const wordCount = story.content?.reduce(
          (acc, chapter) => acc + chapter.content.split(" ").length,
          0
        );

        return (
          <CardHorizontal
            key={story._id}
            className="p-6 flex items-center justify-between"
          >
            <div className="flex-1 pr-4">
              <p className="text-m text-gray-500">Unknown Genre</p>
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <p className="text-m text-gray-500">
                {wordCount.toLocaleString()} words - {story.content.length} Chapters
              </p>
              <p className="text-m text-gray-700">by {story.author.name}</p>

              <div className="flex gap-1.5 mt-2">
                <Button>Edit</Button>
                <Button>Delete</Button>
              </div>

              {story.pendingChapters?.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">Pending Chapters</h3>
                  {story.pendingChapters.map((chapter, index) => (
                    <div key={chapter._id} className="mb-3 border-b pb-2">
                      <h4 className="text-md font-medium">{chapter.title}</h4>
                      <p className="text-sm text-gray-600">
                        {chapter.content.slice(0, 150)}...
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="secondary"
                          onClick={() => handleApprove(story._id, index,story.title)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(story._id, index)}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedChapter({
                              title: chapter.title,
                              content: chapter.content,
                            });
                            setIsModalOpen(true);
                          }}
                        >
                          View Content
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-128 h-58 flex-shrink-0 bg-gray-300 rounded-lg overflow-hidden relative">
              <Image
                src={story.imageUrl}
                alt={story.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </CardHorizontal>
        );
      })}
    </div>

    {/* ✅ Modal content is now inside return */}
    {isModalOpen && selectedChapter && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-4">{selectedChapter.title}</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{selectedChapter.content}</p>
        </div>
      </div>
    )}
  </>
);

}