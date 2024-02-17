import {NextApiRequest, NextApiResponse} from 'next';

const OpenAI = require('openai');
const apiKey = process.env.OPENAI_API_KEY;

export default async function getSongs(req: NextApiRequest, res: NextApiResponse) {
    try {

        const {prompt} = req.body;


        const openai = new OpenAI({apiKey: apiKey});

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    "role": "system",
                    "content": "You are to provide answers in a form of a JSON array that strictly follows this format: [{artist:'artist name', song:'song name'}]. Please ensure that each entry in the array is a valid JSON object, and adhere to this structure meticulously."
                },
                {"role": "user", "content": prompt},
            ],
            model: "gpt-3.5-turbo",
        });

        let parsedCompletion;
        try {
            parsedCompletion = JSON.parse(completion.choices[0].message.content);
        } catch (parseError) {
            console.error('Error parsing completion:', parseError);
            return res.status(400).json({error: 'Invalid format received from OpenAI API'});
        }
        console.log("parsedCompletion:", parsedCompletion)

        res.status(200).json(parsedCompletion);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}