import React from "react";
import { FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";

function Logo({ className }) {
  return (
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <FaBlog
        className="size-5"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Blogsly
      </span>
    </Link>
  );
}

export default Logo;
