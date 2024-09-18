import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { config } from "dotenv";

config();

export async function langchainPrompts({ model = "gpt-3.5-turbo", essay = "Maize" }) {
    const openAIModel = new ChatOpenAI({
      model: model, 
      temperature: 0.9,  
    });
    const prompt = ChatPromptTemplate.fromTemplate("You summarise essays for students {essay}.");
    const parser =  new StringOutputParser()

    const chain = prompt.pipe(openAIModel).pipe(parser)
    const res =  await chain.invoke({
        essay
    })

    return res;
  }