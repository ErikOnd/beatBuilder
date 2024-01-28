import {NextApiRequest, NextApiResponse} from 'next';

const OpenAI = require('openai');
const apiKey = process.env.OPENAI_API_KEY;

export default async function getSongs(req: NextApiRequest, res: NextApiResponse) {
    try {

        let {prompt} = req.body;
        console.log("Received prompt:", prompt);


        const openai = new OpenAI({apiKey: apiKey});

        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are to provide answers in the form of a JSON array that has this format: [{artist:'artist name', song:'song name'}]"},
                {"role": "user", "content": prompt},
            ],
            model: "gpt-3.5-turbo",
        });

        const parsedCompletion = JSON.parse(completion.choices[0].message.content);
        res.status(200).json(parsedCompletion);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
