import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";
import {  useState } from "react";
import authService from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "@/redux-toolkit/reducer/authSlice";


const signinBody = zod.object({
  email: zod.string(),
  password: zod.string(),
});

function Loginform() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signinBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSumithandlar = async (data) => {
    setIsSubmitting(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("🚀 ~ onSumithandlar ~ userData:", userData);
        if (userData) {
          dispatch(login(userData));
        
          toast({
            title: "Login Success",
            variant: "success",
          });
          navigate("/");
        }
      }
    } catch (error) {
      // console.log("🚀 ~ onSumithandlar ~ error:", error instanceof AppwriteException);
      toast({
        title: "Uh oh! Something went wrong.",
        description:error?.message ?? "There was a problem with your request.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSumithandlar)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="xyz@gmail.com" {...field} />
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
                <Input type="password" placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Signup"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default Loginform;
