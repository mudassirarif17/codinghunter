// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// End point for calling this route
// http://localhost:3000/api/getblog?slug=how-to-learn-js
import * as fs from "fs";
export default function handler(req, res) {
    fs.readFile(`blogsData/${req.query.slug}.json` , 'utf-8' , (err , data)=>{
        if(err){
            res.status(500).json({error : "No such blog found"});
        }
        // console.log(data);
        // console.log(req.query.slug);
        res.status(200).json(JSON.parse(data));
    } )
  }
  