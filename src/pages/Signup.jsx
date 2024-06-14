import React from "react";
import Signupform from "../components/Signupform";
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

function Signup() {
  return (
    <CardContainer className="inter-var py-10 px-2">
      <CardBody className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]  dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardHeader>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            <CardTitle>Sign Up</CardTitle>
          </CardItem>
          <CardItem
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardItem>
        </CardHeader>

        <CardItem translateZ="100" className="w-full mt-4">
          <CardContent>
            <Signupform />
          </CardContent>
        </CardItem>

        <div className="flex justify-between items-center">
          <CardFooter>
            <p>
              Already have an account? <Link to={"/signin"}>Login</Link>
            </p>
          </CardFooter>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default Signup;
