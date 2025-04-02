import React from "react";
import { Link } from "react-router-dom";
const Button1 = (props) => {
  const { name, borderColor, bgColor, textColor, hoverColor } = props;

  return (
    <Link
      className={`group relative inline-block overflow-hidden border-2 ${borderColor} pb-2 pt-1 px-8 mt-3 focus:outline-none focus:ring`}
      to="#"
    >
      <span
        className={`absolute inset-y-0 left-0 w-[0px] bg-${bgColor} transition-all duration-500 group-hover:w-full`}
      ></span>
      <span
        className={`relative text-base font-light text-${textColor} transition-colors group-hover:text-${hoverColor}`}
      >
        {name}
      </span>
    </Link>
  );
};

export default Button1;
