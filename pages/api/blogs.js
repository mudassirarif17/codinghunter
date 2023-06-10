// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// End point for calling this route 
// http://localhost:3000/api/blogs

import * as fs from "fs";

// export default function handler(req, res) {
//     fs.readdir(`blogsData` , (err , data)=>{
//         console.log(data);
//         res.status(200).json(data);
//     } )
//   }

export default async function handler(req, res) {
    let data = await fs.promises.readdir(`blogsData`)
    // console.log(data)
        let myfiles;
        let allBlogs = [];
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            // console.log(item);
            myfiles = await fs.promises.readFile(('blogsData/' + item) , 'utf-8')
            // console.log(myfiles)
            allBlogs.push(JSON.parse(myfiles))
        }
        res.status(200).json(allBlogs);
  }
  