import { OpenAI } from "@langchain/openai";


export async function langchainTextCompletion({ model = "gpt-3.5-turbo-instruct", prompt = "Once upon a time" }) {
    const openAIModel = new OpenAI({
      model: model, 
      temperature: 0.9,  
    });
    const res = await openAIModel.invoke(
      prompt
    );
    console.log(res);
    return res;
  }

