import { GoogleGenerativeAI } from "@google/generative-ai";



 async function generateContent (req, res)  {
    const { prompt } = req.body;    
    //  console.log(prompt)
    try {
        const genAi = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
        const model = genAi.getGenerativeModel({
            model: 'gemini-1.5-pro',
        });

        const response = await model.generateContent(prompt);
        res.json({ content: response.response.text() });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
};
export default generateContent;
