import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { config } from "dotenv";

config();

export async function askLessonQuestions({ model = "gpt-3.5-turbo", content, question, subject,topic, level }) {
    const openAIModel = new ChatOpenAI({
      model: model, 
      temperature: 0.9,  
    });
    const prompt = ChatPromptTemplate.fromTemplate(`Your job is to answer {questions} asked by students based on {content}. The subject is {subject}, topic is {topic} and level for the students is {level}
    
     Always Make sure the data is returned with HTML tags. Don't put DOCTYPE, html, head, or body tags. Just the content.

    `
    );
    const parser =  new StringOutputParser()

    const chain = prompt.pipe(openAIModel).pipe(parser)

    const res =  await chain.invoke({
        content,
        question,
        topic,
        subject,
        level
       
    })

    return res;
  }