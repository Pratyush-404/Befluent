import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const whisper = async (req: Request, res: Response) => {
  const { audio } = req.body;

  if (!audio) {
    return res.status(400).json({ error: 'Audio is required' });
  }

  try {
    const response = await openai.createTranscription({
      model: 'whisper-1',
      audio,
    });

    const { data } = response;
    const { text } = data;

    if (!text) {
      return res.status(500).json({ error: 'No transcription from AI' });
    }

    res.json({ transcription: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
