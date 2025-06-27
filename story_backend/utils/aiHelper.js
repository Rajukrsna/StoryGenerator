import fetch from "node-fetch";
import { AWAN_API_URL, GEMINI_API_KEY } from "../config/config.js";

/** 🔹 Generate AI Suggestions for a Story with Genre */
export const generateAISuggestion = async (title, content) => {
  try {
    if (!GEMINI_API_KEY) {
      console.error("❌ Missing Gemini API Key! Ensure GEMINI_API_KEY is set in .env");
      return "AI suggestion service unavailable.";
    }

    console.log(`🟢 Requesting AI Suggestion using Gemini for title: ${title}`);

    const prompt = `Continue this story for the title: "${title}".

Story so far:
"${content}"

Guidelines:
- Maintain a thrilling tone and atmosphere.
- Expand with rich descriptions and vivid details.
- Develop character emotions and realistic interactions.
- Introduce an engaging plot twist or unexpected event.
- Keep the writing style natural and immersive.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText) {
      console.log("✅ AI Suggestion Generated Successfully");
      return generatedText.trim();
    } else {
      console.error("❌ No response from Gemini:", data);
      return "No AI suggestion available.";
    }
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message || error);
    return "AI suggestion failed.";
  }
};

/** 🔹 Generate AI Story Summary */
export const generateStorySummary = async (storyText) => {
  try {
    if (!AWAN_API_KEY) {
      console.error(
        "❌ Missing AI API Key! Ensure AWAN_API_KEY is set in .env"
      );
      return "AI summary service unavailable.";
    }

    console.log("🟢 Generating AI Story Summary...");

    const prompt = `Summarize this story in a concise and engaging way:
    
    Story: "${storyText}"`;

    const response = await fetch(AWAN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AWAN_API_KEY}`,
      },
      body: JSON.stringify({
        model: "Meta-Llama-3-8B-Instruct",
        prompt,
        max_tokens: 100,
        temperature: 0.5,
      }),
    });

    const data = await response.json();

    if (data.choices?.length > 0) {
      console.log("✅ AI Summary Generated Successfully");
      return data.choices[0].text.trim();
    } else {
      console.error("❌ AI Response Error:", data);
      return "No summary available.";
    }
  } catch (error) {
    console.error("❌ AI Error:", error.message || error);
    return "AI summary failed.";
  }
};
