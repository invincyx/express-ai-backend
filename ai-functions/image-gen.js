import OpenAI from "openai";

const openai = new OpenAI();

export async function generateImage({prompt = "a white siamese cat", n = 1, size = "1024x1024", model = "dall-e-3"}){

    const response = await openai.images.generate({
        model: model,
        prompt: prompt,
        n: 1,
        size: size,
      });
    //   image_url = response.data[0].url;
      return response;
}

