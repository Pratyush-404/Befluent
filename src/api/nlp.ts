import { Request, Response } from 'express';
import { supa } from '../../supabase';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const nlp = async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      max_tokens: 150,
    });

    const { data } = response;
    const { choices } = data;

    if (!choices || choices.length === 0) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    const aiResponse = choices[0].text;

    await supa.from('ai_interactions').insert({
      user_input: text,
      ai_response: aiResponse,
    });

    res.json({ aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
