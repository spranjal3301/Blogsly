import React from 'react'
import Loginform from '../components/Loginform';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";

function Login() {

  return (
      <CardContainer className="inter-var py-10 px-2">
      <CardBody className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]  dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
      
      <CardHeader>
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          <CardTitle>Sign In</CardTitle>
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
           <CardDescription>
          Enter your credentials to access your account
          </CardDescription>
        </CardItem>
        </CardHeader>

        <CardItem translateZ="100" className="w-full mt-4">
        <CardContent>
          <Loginform />
        </CardContent>
        </CardItem>

        
        <CardFooter>
          <span>
          Don't have an account? <Link className='hover:underline' to={"/signup"}>SignUp</Link>
          </span>
        </CardFooter>

      </CardBody>
    </CardContainer>
  )
}

export default Login;