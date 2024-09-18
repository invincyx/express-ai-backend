import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { config } from "dotenv";

config();

export async function keypointsGenerator({ model = "gpt-3.5-turbo", content }) {
    const openAIModel = new ChatOpenAI({
      model: model, 
      temperature: 0.9,  
    });
    const prompt = ChatPromptTemplate.fromTemplate(`You generate key points for educational content. For the content: {content} generate key points.
    
     Always Make sure the data is returned with HTML tags. Don't put DOCTYPE, html, head, or body tags. Just the content.

    Examples: 

        ###

       <h3>Topic Name</h3>
       <p>Causes (e.g., greenhouse gases, deforestation)</p>
       <p>Effects on weather patterns</p>
       <p>Impact on biodiversity</p>
       <p>Economic implications</p>
          
    
    ###
    
    
    `
    );
    const parser =  new StringOutputParser()

    const chain = prompt.pipe(openAIModel).pipe(parser)

    const res =  await chain.invoke({
        content,
       
    })

    return res;
  }