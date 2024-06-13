// import Error from "./Error";
// import Login from "./Login";
// import Signup from "./Signup";
// import AddPost from "./AddPost";
// import AllPost from "./AllPost";
// import EditPost from "./EditPost";
// import Home from "./Home";

import { lazy } from "react";

const Error = lazy(() => import("./Error"));
const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));
const AddPost = lazy(() => import("./AddPost"));
const Post = lazy(() => import("./Post"));
const EditPost = lazy(() => import("./EditPost"));
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Allposts = lazy(() => import("./Allposts"));
const MyPosts = lazy(() => import("./MyPosts"));



export { 
    Error,
    Login,
    Signup,
    AddPost,
    Post,
    EditPost,
    Home, 
    About,
    Allposts,
    MyPosts,
};

