// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs";
export default function handler(req, res) {
    fs.readFile('blogsData/how-to-learn-Flask.json' , 'utf-8' , (err , data)=>{
        // console.log(data);
        res.status(200).json(JSON.parse(data));
    } )
    // by default given 
    // res.status(200).json({ name: 'Mudassir' })
  }
  