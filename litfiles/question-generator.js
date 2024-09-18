

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { config } from "dotenv";

config();

export async function generateQuestions({ model = "gpt-3.5-turbo", numQuestions = 5, content }) {
    const openAIModel = new ChatOpenAI({
      model: model, 
      temperature: 0.9,  
    });
    const prompt = ChatPromptTemplate.fromTemplate(`You generate {numQuestions} practice questions for students from the supplied content {content}. Return the questions in with HTML tags. Don't put DOCTYPE, html, head, or body tags. Just the content. Below is an example of the output.
        
        Examples:
        <ol>
            <li> What role did figures like Robert Mugabe play in Zimbabwe's history?</li>
            <li> How has the land reform program in Zimbabwe affected the country's economy?</li>
            <li> What are some of the pressing issues facing Zimbabwe today?</li>
            <li> How do traditional music, dance, and art contribute to Zimbabwean identity?</li>
            <li> What are some efforts being made to revitalize Zimbabwe's economy and restore political stability?</li>
            <li> How has hyperinflation impacted the daily lives of Zimbabweans?</li>
        </ol>
        ` );
    const parser =  new StringOutputParser()

    const chain = prompt.pipe(openAIModel).pipe(parser)

    const res =  await chain.invoke({
        content,
        numQuestions
    })

    return res;
  }