import React from "react";
import SorryImage from "../../assets/sorry.webp";
import { Link } from "react-router-dom";
const Sorry = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 justify-center items-center h[80vh]">
        <div className="w-[50%]">
          <img
            src={SorryImage}
            alt={"Sorry image"}
            className="w-[75%] block mx-auto object-cover"
          ></img>
        </div>
        <div className="w-[900px">
          <p className="text-gray-500 text-center">Page Not Found</p>
          <Link to={"/"}>
            <button className="px-6 p-2 bg-violet-500 font-bold text-white rounded-md mx-auto">
              <i class="fa fa-home mx-1" aria-hidden="true"></i>Go To Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sorry;
