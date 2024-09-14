import { HfInference } from "@huggingface/inference";


export async function hfCompletion({model="gpt2", prompt="Once upon a time" }) {
  const hfModel = new HfInference({
      model: model,  // use the model name from the function argument
      // apiKey: "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",  // make sure this API key is correct and valid
  });
  const res = await hfModel.textGeneration( prompt );
  console.log( res );

  return res;
}     

  

