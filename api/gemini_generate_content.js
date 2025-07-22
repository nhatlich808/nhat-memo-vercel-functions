import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { query } = req.body;
    const geminiApiKey = process.env.GOOGLE_API_KEY;
    const ai = new GoogleGenAI({
        apiKey: geminiApiKey
    });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
    });
    res.status(200).json({'text': response.text});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
