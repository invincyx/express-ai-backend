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
    const prompt = ChatPromptTemplate.fromTemplate(`You help students write essays but you don't write the essay for them. You can help them with the structure, grammar, and ideas. You can also help them with the conclusion. You can also help them with the introduction. You can also help them with the body. From the topic: {topic}. Help the student write an essay in the format given in the exapmles. If don't know the answer or are unsure of the answer, reply with "I'm sorry I can't assist with that.".
    Check if the topic is a valid topic. If it is not a valid topic, reply with "I'm sorry I can't assist with that.".

    
     Always Make sure the data returned with HTML tags. Don't put DOCTYPE, html, head, or body tags. Just the content.

    Examples: 

        ###

        Definition of climate change
        Causes (e.g., greenhouse gases, deforestation)
        Effects on weather patterns
        Impact on biodiversity
        Economic implications
    
    Outline Creation: The tool suggests an outline:
    
        Introduction: Define climate change and its importance
        Body Paragraph 1: Causes
        Body Paragraph 2: Effects on weather
        Body Paragraph 3: Impact on biodiversity
        Conclusion: Summary and call to action
    
    Writing Tips: Offer specific tips related to the topic.
    
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