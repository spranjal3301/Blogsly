import React from 'react'
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import dbService from '@/appwrite/db';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



function Post3dCard({post=null}) {
  return (
    <CardContainer className="inter-var md:w-96 w-full">
      <CardBody className=" relative group/card cursor-pointer  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]  dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="25"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {post?post.title:"Make things float in air"}
        </CardItem>
        <CardItem
          as="p"
          translateZ="30"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {"Lorem, ipsum dolor sit amet consectetur adipisicing elit."}
        </CardItem>
        <CardItem translateZ="30" className="w-full mt-4">
          <LazyLoadImage
            src={post?dbService.getFilePreview(post.featureImage):"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            height="auto"
            effect="blur"
            width="100%"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-end items-center md:mt-10 mt-5">
        
          <CardItem
            translateZ={10}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white "
          >
            Read now...
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}



export default Post3dCard;