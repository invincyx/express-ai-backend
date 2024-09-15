import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { config } from "dotenv";

config();

export async function summaryPrompts({ model = "gpt-3.5-turbo", maxChars = 1000, essay }) {
    const openAIModel = new ChatOpenAI({
      model: model, 
      temperature: 0.9,  
    });
    const prompt = ChatPromptTemplate.fromTemplate("You summarise essays for students {essay}. The summary should be less than {maxChars} characters.");
    const parser =  new StringOutputParser()

    const chain = prompt.pipe(openAIModel).pipe(parser)

    const res =  await chain.invoke({
        essay,
        maxChars
    })

    return res;
  }