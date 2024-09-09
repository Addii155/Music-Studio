import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi=new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const model=genAi.getGenerativeModel({
    model:"gemini-1.5-pro"
})
const r= await model.generateContent('best programinng lang');

console.log(r.response.text())