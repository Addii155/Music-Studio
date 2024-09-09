import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi=new GoogleGenerativeAI("AIzaSyAPXlXOphmOtWMng7gwYUIR12AfwMeJczA")

const model=genAi.getGenerativeModel({
    model:"gemini-1.5-pro"
})
const r= await model.generateContent('best programinng lang')

console.log(r.response.text())