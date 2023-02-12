import { NextPage } from "next";
import Head from "next/head";
import * as React from 'react';
import Image from "next/image";
import { PostCard, PostWidget, Categories } from "../components";
import { useQuery } from "@apollo/client";
import {getPosts} from '../services'


const Home = () => {
  const {loading,error,data}= useQuery(getPosts);
  if(loading){
    return<p>Loading</p>
  }
  if(error) {
    return(<p>Error </p>)
  };
  const postList=data.postsConnection.edges;
  console.log(postList)
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>The Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="lg:col-span-8 col-span-1">
          {
          postList.map((post) => (<PostCard key={post.node.title} post={post.node} /> ))
          }
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget/>
            <Categories/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
