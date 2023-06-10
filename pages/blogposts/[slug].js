import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import style from "../../styles/slug.module.css"
import * as fs from "fs"


const Slug = (props) => {
  const router = useRouter();
  // below line is for useEffect 
  // const [blog, setBlog] = useState();

  // This line is for SSR
  const [blog, setBlog] = useState(props.myBlog);

  // For danferously set inner html
  function createMarkup(c) {
    return { __html: c };
}

  // 1 First Method For Calling the Api similar to react
  // useEffect(() => {
  //   if(!router.isReady) return;
  // // console.log(router.query);
  // const { slug } = router.query;
  //   fetch(`http://localhost:3000/api/getblog?slug=${slug}`).then((a) => {
  //     return a.json()
  //   })
  //     .then((parsed) => {
  //       // console.log(parsed)
  //       setBlog(parsed)
  //     })
  // }, [router.isReady])

  return (
    <div className={style.maincontainer}> 
      <h1>{blog && blog.title}</h1>
      <hr />
      <p>{blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}</p>
    </div>
  )
}

// PRE RENDERING IN NEXT JS 
// 2 Second Method for calling Api in next js is SSR server side rendering 
// export async function getServerSideProps(context){
//   // console.log(context)
//   const {slug} = context.query;
//   let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//   let myBlog = await data.json();
//     return{
//       props : {myBlog}
//     }
// }

// 3 Third method is Static site geneeration SSG
// This method is used for extract path
export async function getStaticPaths() {
  return {
    paths : [
    {params : {slug : 'how-to-learn-flask'}}, // will be passed to the page component as props
    {params : {slug : 'how-to-learn-javascript'}}, 
    {params : {slug : 'how-to-learn-nextjs'}}, 
    {params : {slug : 'how-to-learn-reactjs'}},
  ],
      fallback : true
  }
}
export async function getStaticProps(context) {
  const {slug} = context.params;
  let myBlog = await fs.promises.readFile(`blogsData/${slug}.json` , 'utf-8')
    return{
      props : {myBlog : JSON.parse(myBlog)}
    }
}


export default Slug;
