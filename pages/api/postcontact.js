import * as fs from "fs";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        //   console.log(req.body)
        let data = await fs.promises.readdir(`contactdata`);
        fs.promises.writeFile(`contactdata/${data.length + 1}.json` , JSON.stringify(req.body))
        // console.log(data);
        res.status(200).json("Post request success" , req);
    } else {
        // Handle any other HTTP method
        res.status(200).json("Other request success");
    }
}