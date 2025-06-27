import dotenv from "dotenv";
dotenv.config();

export const AWAN_API_URL = "https://api.awanllm.com/v1/completions";
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
export const AWAN_MODEL = "Meta-Llama-3-8B-Instruct"; // ✅ Specify the model
