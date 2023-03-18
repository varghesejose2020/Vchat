const express =require("express")
require("dotenv").config()
const cors =require("cors")
const bodyParser =require("body-parser")
const {Configuration,OpenAIApi} =require("openai")
const { status } = require("express/lib/response")

const app = express();
app.use(cors());
app.use(bodyParser.json());



const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);
app.post("/ask",async(req,res)=>{
 const prompt = req.body.prompt;
 if(!prompt){
    return res.status(400).send({error:'prompt is required'})

 }
 
 try{
    await openai.createCompletion({
        model :'text-davinci-003',
        prompt:prompt,
        temperature:0,
        max_tokens:2000
    }).then((response)=>{
        res.send({data:response.data.choices[0].text})
    })

 }  
 catch(error){
  console.log(error);
  res.status(500).send({error});
 } 
});

app.listen(5000,()=>{
    console.log('connected to port 5000')
});
