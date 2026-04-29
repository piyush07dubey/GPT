import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY ,
    dangerouslyAllowBrowser:true,
    
});
const chatCompletion = await groq.chat.completions.create({
  messages: [{ role: "user", content: "Explain fast language models" }],
  model: "llama-3.1-8b-instant",
});   
export default chatCompletion; 