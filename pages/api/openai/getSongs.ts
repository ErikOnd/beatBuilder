import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
const apiKey = process.env.OPENAI_API_KEY;

export default async function getSongs(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body.prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    const openai = new OpenAI({ apiKey });
    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
        try {
            const openAiResponse = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are to provide answers in a form of a JSON array that strictly follows this format: [{artist:'artist name', song:'song name'}]. Please ensure that each entry in the array is a valid JSON object, and adhere to this structure meticulously."
                    },
                    { role: "user", content: req.body.prompt },
                ],
                model: "gpt-3.5-turbo",
            });

            if (!openAiResponse.choices || !openAiResponse.choices[0] || !openAiResponse.choices[0].message || !openAiResponse.choices[0].message.content) {
                console.error('Unexpected API response structure:', openAiResponse.choices);
                throw new Error('Unexpected API response structure');
            }

            let parsedResponse;
            try {
                parsedResponse = JSON.parse(openAiResponse.choices[0].message.content);
                console.log("Successfully parsed openAiResponse");
                res.status(200).json(parsedResponse);
                success = true;
            } catch (parseError) {
                console.error('Error parsing openAiResponse:', parseError, openAiResponse.choices);
                throw new Error('Invalid format received from OpenAI API:');
            }
        } catch (error) {
            console.error('Attempt', attempt + 1, 'failed:', error);
            attempt++;
            if (attempt >= maxRetries) {
                console.error('Maximum retry attempts reached. Failing with error.');
                res.status(500).json({ error: 'Internal Server Error after multiple attempts' });
            }
        }
    }
}
