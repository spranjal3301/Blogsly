import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import authService from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "@/redux-toolkit/reducer/authSlice";


const UserSignupSchema=zod.object({
  name:zod.string().max(30),
  email:zod.string().email(),
  password:zod.string().min(8)
});



function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate=useNavigate();
  const dispatch=useDispatch();



  
  const form=useForm({
    resolver:zodResolver(UserSignupSchema),
    defaultValues:{
      name:'',
      email:'',
      password:''
    }
  })

  const onSumithandlar= async (data)=>{
    setIsSubmitting(true);
    try {
        const session=await authService.createAccount(data);
        if(session){
            const userData=await authService.getCurrentUser();
            console.log("🚀 ~ onSumithandlar ~ userData:", userData)
            if(userData){
                dispatch(login(userData));
                toast({
                  title:"Account Create",
                  variant: "success"
                });
                navigate('/blog');
            }
        }
    } catch (error) {
    // console.log("🚀 ~ onSumithandlar ~ error:", error)
      toast({
        title:"Uh oh! Something went wrong.",
        description: error?.message ?? "There was a problem with your request.",
        variant: "destructive" 
      })
    }
    finally{
      setIsSubmitting(false)
    }
  }


  return (
    <Form {...form}>

    <form onSubmit={form.handleSubmit(onSumithandlar)} className="space-y-4">




    <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="xyz" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />    


    <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input  placeholder="xyz@gmail.com" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />    


    <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password"  placeholder="" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />    



      <Button type="submit" disabled={isSubmitting} className="w-full">
        {
           isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
            </>
           ) :
           ('Signup')
        }
        </Button>
    </form>

  </Form>
  );
}

export default SignupForm;