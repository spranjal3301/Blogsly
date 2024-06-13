import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux-toolkit/store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx";
import {
  About,
  AddPost,
  Allposts,
  EditPost,
  Error,
  Home,
  Login,
  MyPosts,
  Post,
  Signup,
} from "./pages/index.jsx";
import { AuthProtection, Loader } from "./components/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <Error />,
      },
      {
        path: "/login",
        element: (
          <AuthProtection authentication={false}>
            <Login />
          </AuthProtection>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthProtection authentication={false}>
            <Signup />
          </AuthProtection>
        ),
      },
      {
        path: "add-post",
        element: (
          <AuthProtection authentication={true}>
            <AddPost />
          </AuthProtection>
        ),
      },
      {
        path: "edit-post/:slug",
        element: (
          <AuthProtection authentication={true}>
            <EditPost />
          </AuthProtection>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path:'/blogs',
        element:(
          <AuthProtection authentication={true}>
            <Allposts/>
          </AuthProtection>
        )
      },
      {
        path:'/my-posts',
        element:(
          <AuthProtection authentication={true}>
            <MyPosts/>
          </AuthProtection>
        )
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
