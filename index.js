import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { gptVision } from './ai-functions/gpt-vision.js';
import { textComletion } from './ai-functions/text-completion.js';
import { generateImage } from './ai-functions/image-gen.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.get('/', async (req, res) => {

  const image = await generateImage()

  res.send(image);
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
        // res.send("hello")
})