import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { config } from "dotenv";

config();

export async function essayHelper({ model = "gpt-3.5-turbo", topic }) {
    const openAIModel = new ChatOpenAI({
      model: model, 
      temperature: 0.9,  
    });
    const prompt = ChatPromptTemplate.fromTemplate(`You help students write essays but you don't write the essay for them. You can help them with the structure, grammar, and ideas. You can also help them with the conclusion. You can also help them with the introduction. You can also help them with the body. From the topic: {topic}. Help the student write an essay in the format given in the exapmles. 
    Check if the topic is a valid topic. If it is not a valid topic, reply with "I'm sorry I can't assist with that.".

    
     Always Make sure the data is returned with HTML tags. Don't put DOCTYPE, html, head, or body tags. Just the content.

    Examples: 

        ###

       <h3>Definition of climate change</h3>
       <p>Causes (e.g., greenhouse gases, deforestation)</p>
       <p>Effects on weather patterns</p>
       <p>Impact on biodiversity</p>
       <p>Economic implications</p>
       
       <h3>Outline Creation: The tool suggests an outline:</h3>
       
       <p>Introduction: Define climate change and its importance</p>
       <p>Body Paragraph 1: Causes</p>
       <p>Body Paragraph 2: Effects on weather</p>
       <p>Body Paragraph 3: Impact on biodiversity</p>
       <p>Conclusion: Summary and call to action</p>
       
       <h3>Writing Tips: Offer specific tips related to the topic.</h3>
       
    
    ###
    
    
    `
    );
    const parser =  new StringOutputParser()

    const chain = prompt.pipe(openAIModel).pipe(parser)

    const res =  await chain.invoke({
        topic,
       
    })

    return res;
  }