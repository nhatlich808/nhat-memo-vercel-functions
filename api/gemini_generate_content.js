import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://nhat-memo.pages.dev');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { query } = req.body;
      const geminiApiKey = process.env.GEMINI_API_KEY;
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
  return res.status(405).json({ error: 'Method not allowed' });
}
