import dbService from '@/appwrite/db';
import { BlogCard, Loader, Post3dCard } from '@/components'
import React, { useEffect, useState } from 'react'

function Home() {
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    (async()=>{
      try {
        const response=await dbService.listPosts([]);
        setPosts(response?.documents?response.documents:[]);
        // console.log(response);
        
      } catch (error) {
        // console.log("🚀 ~ error:", error)
        toast({
          title:"Uh oh! Something went wrong.",
          description: error?.message ?? "There was a problem with your request.",
          variant: "destructive" 
        })
      }
      finally{
        setLoading(false);
      }
    })();
  },[])

  if(loading)
    return <Loader/>
   

  return (
    <>
      <BlogCard posts={posts}/>
    </>
  )
}

export default Home