import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI();

export async function mathSolver(imageUrl) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `Solve the math and show step by step working and return the response in HTML tags. Don't put DOCTYPE, html, head, or body tags. Just the content.

              if the image doesn't contain math respond with "Please provide an image with a math problem to solve.😀."
                
                Examples:

                <h3>Step 1</h3> <br />
                <p>Step 1 content</p> <br /><br />
                <h3>Step 2</h3><br />
                <p>Step 2 content</p><br /><br />
                <h3>Step 3</h3><br />
                <p>Step 3 content</p><br /><br />
                
                `   },
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
