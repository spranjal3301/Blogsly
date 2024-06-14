import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "..";
import { Button } from "../ui/button";
import { useTheme } from "../theme-provider";
import { Moon, Sun } from "lucide-react";
import "transition-style";
import Logout from "./Logout";
import Loginbtn from "./Loginbtn";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [issetTheme, setIssetTheme] = useState(false);
  const { theme, setTheme } = useTheme();
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      path: "/",
      isActive: true,
    },
    {
      name: "Blogs",
      path: "/blogs",
      isActive: authStatus,
    },
    {
      name:"Create-Post",
      path:"/add-post",
      isActive:authStatus
    },
    {
      name:"MyPosts",
      path:"/my-posts",
      isActive:authStatus
    },
    {
      name: "About",
      path: "/about",
      isActive: true,
    },
    {
      name: "Contact",
      path: "/contact",
      isActive: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      isActive: !authStatus,
    },
 
  ];

  useEffect(() => {
    if (issetTheme) {
      setTimeout(() => {
        setTheme(theme === "light" ? "dark" : "light");
        setIsAnimating(false);
      }, 1500); // Match the animation duration
      setIssetTheme(false);
    }
  }, [issetTheme]);

  const toggleTheme = () => {
    setIssetTheme(true);
    setIsAnimating(true);
  };


  return (
    <nav className="w-full z-20 top-0 start-0 border-b" transition-style={isAnimating ? "out:wipe:bottom-left" : ""}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="space-x-2">
            {authStatus ? <Logout /> : <Loginbtn />}
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              
            >
              {theme === "light" ? <Sun /> : <Moon />}
            </Button>
          </div>

          {/*//`Hamburger Menu*/}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 "
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out items-center justify-between  ${
            isMenuOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1  `}
          id="navbar-sticky"
        >
          <ul className="flex flex-col w-full p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
            {navItems.map(
              (items, idx) =>
                items.isActive && (
                  <li key={idx}>
                    <NavLink
                      to={items.path}
                      className={({ isActive }) =>
                        `block py-2 px-3 md:p-0 hover-link md:${
                          isActive ? "active-hover-link" : "hover-link"
                        }`
                      }
                    >
                      {items.name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
