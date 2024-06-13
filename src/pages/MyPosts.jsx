import dbService from '@/appwrite/db';
import { BlogCard, Loader, Post3dCard } from '@/components'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Error } from '.';


function MyPosts() {
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);
  const userData=useSelector((state)=>state.auth.userData);
  // console.log(userData);

  useEffect(()=>{
    (async()=>{
      try {
        const response=await dbService.myPosts(userData);
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
  
  if(loading)return <Loader/>

  if(posts.length==0)return <Error/>

  return (
    <div className='flex flex-wrap justify-evenly gap-10 py-10 px-2'>

        {posts.map((post)=>(
            <Link to={`/post/${post.$id}`} key={post.$id}>
            <Post3dCard  post={post}/>
            </Link>
        ))}
  
    </div>
  )
}

export default MyPosts