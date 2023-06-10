import React, { useState, useEffect } from 'react'
import styles from '@/styles/Blog.module.css'
import Link from 'next/link'
import * as fs from 'fs';
import axios from 'axios';

const Blog = (props) => {
  // For useEffect 
  // const [blogs, setBlogs] = useState([]);
  // For server side rendering 
  const [blogs, setBlogs] = useState(props.allBlogs);

  // 1 First Method For Calling the Api similar to react
  // useEffect(()=>{
  //   fetch(`http://localhost:3000/api/blogs`).then((a)=>{
  //     return a.json();
  //   })
  //     .then((parsed)=>{
  //       // console.log(parsed);
  //       setBlogs(parsed);
  //     })
  // },[])

  return (
    <div>
      <section className={ styles.blogSection }>
        <h1 className=''>Hunting Coder</h1>
        <p className='myspan'>A blog for hunting coders by hunting coder</p>
        <div className={ styles.blog }>
{
  blogs && blogs.length > 0 && blogs.map((blogitem , index)=>{
    return <div className={ styles.blogItems } key={index}>
            <Link href={`blogposts/${blogitem.slug}`}><h2>{blogitem.title}</h2>
            <p>{blogitem.content.substr(0,140)}...</p>
            <button className={styles.btn} type='submit'>Read More</button></Link>
          </div>
})
}
</div>
      </section>
    </div>
  )
}
// PRE RENDERING IN NEXT JS 
// 2 Second Method for calling Api in next js is SSR server side rendering 
// export async function getServerSideProps(){
//   let data = await fetch(`http://localhost:3000/api/blogs`)
//   let allBlogs = await data.json();
//     return{
//       props : {allBlogs}
//     }
// }
  
// 3 Third method is Static site geneeration SSG
export async function getStaticProps(context) {
  let data = await fs.promises.readdir(`blogsData`)
    // console.log(data)
        let myfiles;
        let allBlogs = [];
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            // console.log(item);
            myfiles = await fs.promises.readFile(('blogsData/' + item) , 'utf-8')
            console.log(myfiles)
            allBlogs.push(JSON.parse(myfiles))
        }
    return{
      props : {allBlogs}
    }
}

export default Blog
