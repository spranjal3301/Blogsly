import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "../ui/button";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "@/redux-toolkit/reducer/authSlice";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Logout() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutHandler = () => {
    (async()=>{
      try {
        await authService.logout();
        dispatch(logout());
        navigate("/");
      } catch (error) {
        console.log("🚀 ~ Logout button ~ error:", error)
      }
    })();
  }


  return (
    <Button onClick={logoutHandler} variant="outline" size="icon">
      <LogOutIcon/>
    </Button>
  );
}

export default Logout;
