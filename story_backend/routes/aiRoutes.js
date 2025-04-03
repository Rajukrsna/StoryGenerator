import express from "express";
import { generateAISuggestion } from "../utils/aiHelper.js";
import Feedback from "../models/feedbackmodel.js"; // ✅ Ensure this model exists

const router = express.Router();

/** ✅ AI Suggestion Route (Supports Genre) */
router.post("/", async (req, res) => {
  try {
    const {title, content} = req.body; // Default empty string if no story text

    if (!title && !content) {
      return res
        .status(400)
        .json({ message: "Provide either story text or genre." });
    }

    const suggestion = await generateAISuggestion(title, content);
    console.log("✅ AI Suggestion:", suggestion);
    res.json({ suggestion });
  } catch (error) {
    console.error("❌ AI Suggestion Error:", error);
    res.status(500).json({ message: "AI Suggestion failed." });
  }
});

/** ✅ AI Feedback Route */
router.post("/feedback", async (req, res) => {
  try {
    const { suggestion, rating, comment } = req.body;

    if (!suggestion || !rating) {
      return res
        .status(400)
        .json({ message: "Suggestion and rating are required." });
    }

    // ✅ Save feedback in the database
    const feedback = new Feedback({ suggestion, rating, comment });
    await feedback.save();

    res.json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("❌ AI Feedback Error:", error);
    res.status(500).json({ message: "Failed to submit feedback." });
  }
});

export default router;
