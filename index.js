import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { gptVision } from './ai-functions/gpt-vision.js';
import { textComletion } from './ai-functions/text-completion.js';
import { generateImage } from './ai-functions/image-gen.js';
import { langchainTextCompletion } from './langchain-ai/text-completion.js';
import { hfCompletion } from './langchain-ai/hf-completion.js';
import { langchainPrompts } from './langchain-ai/prompting.js';
import { summaryPrompts } from './litfiles/summarize.js';
import { essayHelper } from './litfiles/essay-helper.js';
import { generateQuestions } from './litfiles/question-generator.js';




dotenv.config();


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.get('/', async (req, res) => {

//   const image = await generateImage()
        console.log("Hello there from the server");
  res.send("Hello there from the server");

})

app.post("/gpt-vision",async (req, res) => {
    
        const visionAi = await gptVision(req.body.imageUrl)

        res.send(visionAi);

//     console.log(req.body.imageUrl); // log the request body to the console
//   res.send('Received a POST request');
})


app.post("/text-completion",async (req, res) => {
        
        const textCompletion = await textComletion({ model: req.body.model, prompt: req.body.prompt });    
        res.send(textCompletion);
})

app.post("/image-gen",async (req, res) => {
        
        const imageGen = await generateImage({ model: req.body.model, prompt: req.body.prompt });    
        res.send(imageGen);
})

app.post("/langchain-text-completion",async (req, res) => {
        
        const langchainText = await langchainTextCompletion({ model: req.body.model, prompt: req.body.prompt });    
        res.send(langchainText);
})

app.post("/hf-completion", async (req, res)=>{
        const hf = await hfCompletion({model: req.body.model, prompt: req.body.prompt});
        res.send(hf);
})

app.post("/lang-prompts", async (req, res)=>{
        const lp = await langchainPrompts({model: req.body.model, essay: req.body.essay});
        res.send(lp);
})

// Lit files 

 app.post("/summarize",async (req, res) => {
                
                const summary = await summaryPrompts({ model: req.body.model, essay: req.body.essay, maxChars: req.body.maxChars });    
                res.send(summary);
 })

app.post("/essay-helper",async (req, res) => {
                
                const helper = await essayHelper({ model: req.body.model, topic: req.body.topic });    
                res.send(helper);
})

app.post("/generate-questions",async (req, res) => {
                
        const questions = await generateQuestions({ model: req.body.model, content: req.body.content, numQuestions: req.body.numQuestions });    
        res.send(questions);
})