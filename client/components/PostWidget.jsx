import React,{useEffect,useState} from "react";
import moment from "moment";
import Image from 'next/image'
import Link from "next/link";
import {useQuery} from '@apollo/client'
import { getRecentPosts,
   getSimilarPosts 
  } from "../services";

const PostWidget = ({categories,slug}) => {
 const [relatedPosts,setRelatedPosts]=useState([]);

 useEffect(() =>{
  if(slug){
    getSimilarPosts(categories,slug).then((result)=>{setRelatedPosts(result)});
  }else{
    getRecentPosts().then((result)=>{setRelatedPosts(result)});
  }
 },[slug]);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold mb-8 pb-4 border-b ">
        {slug?'Reated Posts':'Recent Posts'}
      </h3>
      {relatedPosts.map((post)=>(
        <div key ={post.title} className="flex items-center w-full mb-4">
         <div className="w-16 flex-none">
          <Image
          className="h-20 w-20 align-middle rounded-full cir"
          height={60}
          width={60}
          alt={post.title}
          src={post.featuredImage.url}
          />
         </div>
         <div className="flex-grow ml-4">
         <p className="text-gray-500 font-xs">
          {moment(post.createdAt).format('MM DD, YYYY')}
         </p>
         <Link className='text-md' key={post.title} href={`/posts/${post.slug}` }>
          {post.title}
         </Link>
         </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
