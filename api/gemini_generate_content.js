import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { query } = req.body;
      const model = google('gemini-2.5-flash');

      const response = streamText({
        model: model,
        providerOptions: {
          google: {
            responseModalities: ['TEXT'],
            thinkingConfig: {
              thinkingBudget: 2048,
            },
          },
        },
        prompt: query,
      });

      return response.toTextStreamResponse({
        headers: {
          'Content-Type': 'text/event-stream',
        },
      });
    } catch (e) {
      return res.status(500).end();
    }
  }
  return res.status(405).end();
}
