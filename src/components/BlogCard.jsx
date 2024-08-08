import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import dbService from "@/appwrite/db";
// import { Blurhash } from "react-blurhash";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';



function BlogCard({ posts = [] }) {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 ">

      {/* {posts.length < 9
          ? dummyContent.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">
                <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                  {item.badge}
                </h2>

                <p className={twMerge("text-xl mb-4")}>{item.title}</p>

                <div className="text-sm  prose prose-sm dark:prose-invert">
                  {item?.image && (
                    <img
                      src={item.image}
                      alt="blog thumbnail"
                      height="1000"
                      width="1000"
                      className="rounded-lg mb-10 object-cover"
                    />
                  )}
                  {item.description}
                </div>
              </div>
            ))
          : ""} */}

        {posts.map(({ $id, title, featureImage, content }) => (
          

          <Link key={$id} to={`/post/${$id}`}>
            <div className="mb-10">
              <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {'Blog'}
              </h2>

              <p className={twMerge("text-xl mb-4")}>{title}</p>

              <div className="text-sm  prose prose-sm dark:prose-invert">
                {featureImage && (
                  // <div className="">
                  <img
                    loading="lazy"
                    src={dbService.getFilePreview(featureImage)}
                    alt={title}
                    height="1000"
                    width="1000"
                    effect="blur"
                    className="rounded-lg max-h-96 mb-10 object-cover cursor-pointer transition-all duration-500 ease-in hover:scale-105"
                  />
                  // </div>
                )}
                {content.length>600?(
                   <span className="flex align-center font-bold text-blue-300 animate-bounce">Read...</span>
                ):(<div className="browser-css">{parse(content)}</div>)}
               
                
              </div>
            </div>
          </Link>

        ))}

        
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "Responsive design",
    description: (
      <>
        <p>
        This is a deep-dive into the role of development in the design process, with a focus on responsive design. It’s aimed at design leaders/managers and developers working with design teams, and visual designers looking to become better web designers. I’ll attempt to lay out the problems, and suggest practical solutions. I hope it helps. 🙂
        </p>
        <p>
        Responsive design has been a thing for roughly 8-9 years now. In the early days, it was downright impressive to see a responsive website! Almost, a ‘dark art’ of web design. But, that was a long time ago.


        </p>
        <p>
        But, much of my freelance web development work involves ‘making things responsive’. Designers ask me to build them a website, then send me a mockup of a desktop-only…


        </p>
      </>
    ),
    badge: "React",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "React Design Patterns",
    description: (
      <>
        <p>
        In the world of frontend development with React, the application of design patterns has become an essential practice. These patterns have evolved in line with the specific needs of React, offering elegant solutions to the recurring challenges developers face when designing robust components and applications.


        </p>
        <p>
        The fundamental purpose of these patterns is to address concrete problems in component development by simplifying the management of state, logic and element composition. By providing predefined structures and proven methodologies, design patterns in React promote consistency, modularity and scalability in the code base.


        </p>
      </>
    ),
    badge: "Changelog",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Advanced JavaScript",
    description: (
      <>
        <p>
        Description: Uncover the intricacies of advanced JavaScript concepts, from nested function scopes and closures to currying, ‘this’ keyword dynamics, prototypes, and modern class-based programming. Elevate your skills with practical examples and a deep dive into iterables and iterators, creating a comprehensive guide for JavaScript developers seeking mastery.
        </p>
      </>
    ),
    badge: "Launch Week",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default BlogCard;
