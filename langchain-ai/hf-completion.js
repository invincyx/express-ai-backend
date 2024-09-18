import { HfInference } from "@huggingface/inference";


export async function hfCompletion({model="gpt2", prompt="Once upon a time" }) {
  const hfModel = new HfInference({
      model: model,  // use the model name from the function argument
      
  });
  const res = await hfModel.textGeneration( prompt );
  console.log( res );

  return res;
}     

  

