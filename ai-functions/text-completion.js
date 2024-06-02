import OpenAI from "openai";

const openai = new OpenAI();

export async function textComletion({model = "gpt-3.5-turbo", prompt = "Once upon a time"}) {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt},
        // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        // {"role": "user", "content": "Where was it played?"}
    ],
    model: model,
  });

  console.log(completion.choices[0]);

  return completion.choices[0];
}
