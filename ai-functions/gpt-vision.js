import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI();

export async function gptVision(imageUrl) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What’s in this image?" },
            {
              type: "image_url",
              image_url: {
                "url": imageUrl,
              },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0]);

    return response.choices[0]

  
  }
