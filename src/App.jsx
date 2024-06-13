import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux-toolkit/reducer/authSlice";
import { Footer, Header, Loader} from "./components";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "./components/ui/use-toast";



function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {toast}=useToast();

  useEffect(() => {
    (async () => {
      try {
        const userData = await authService.getCurrentUser();
        // console.log("🚀 ~ userData:", userData);
        userData ? dispatch(login({ userData })) : dispatch(logout());
      } catch (error) {
        // console.log("🚀 ~App useEffect error:", error);
        toast({
          title:"Uh oh! Something went wrong.",
          description: error?.message ?? "There was a problem with your request.",
          variant: "destructive" 
        })
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loader/>
  }

  return (
      <div className="min-h-screen flex flex-wrap  content-between ">
        <div className="w-full ">
          <Header />

          
          <main>
            <Outlet />
            <Toaster />
          </main>
         

          <Footer />
        </div>
      </div>
  );
}

export default App;
