import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";


function Footer() {
  const footBar=[
    {
      name:'About',
      path:'/about'
    },
    {
      name:'Blogs',
      path:'/blogs'
    },
    {
      name:'Home',
      path:'/'
    },
    {
      name:'MyPosts',
      path:'my-posts'
    }
  ]

  const Socialmedia=[
    {
      name:'Github',
      element:<FaGithub className="size-5  dark:hover:text-white"/>,
      path:'https://github.com/spranjal3301'
    },
    {
      name:'LinkedIn',
      element:<FaLinkedin className="size-5  dark:hover:text-white"/>,
      path:'https://www.linkedin.com/in/spranjal3301/'
    },
    {
      name:'Twitter',
      element:<FaXTwitter className="size-5  dark:hover:text-white"/>,
      path:'https://x.com/spranjal_3301'
    },
    {
      name:'LeetCode',
      element:<SiLeetcode className="size-5  dark:hover:text-white"/>,
      path:'https://leetcode.com/u/spranjal_3301/'
    }
  ]

  return (
    <footer className="shadow border-t-2 border-slate-300/10">
      <div className="w-full flex flex-col items-center flex-wrap  justify-center gap-10 my-8 text-gray-500">
        <div className="flex flex-wrap gap-10 cursor-pointer">
          {
            footBar.map(({name,path})=>(
               <Link key={name} to={path} className="hover-link">{name}</Link>
            ))
          }
        </div>

        <div className="flex gap-10 cursor-pointer flex-wrap">
            {
              Socialmedia.map(({element,path})=>(
                <a key={path} href={path} target="_blank" rel="noreferrer" className="">{element}</a>
              ))
            }
            {/* className="size-5  dark:hover:text-white" */}
        </div>

        <div>
        <span className="block text-  sm:text-center dark:text-gray-400">© 2024 <a href="https://www.linkedin.com/in/spranjal3301/" className="hover-link">
          Pranjal-SIngh™</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    
    </footer>
  );
}

export default Footer;
