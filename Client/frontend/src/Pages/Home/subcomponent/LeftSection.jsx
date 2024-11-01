import React from "react";
import { Link } from "react-router-dom";

const LeftSection = () => {
  return (
    <div className="w-1/2 h-full absolute bg-[#0251CE] rounded-br-3xl shadow-2xl z-20 overflow-hidden ">
      <img
        src="./Group 65.png"
        alt=""
        className="w-[18vw] absolute right-0 -top-[12vh] z-10"
      />
      <img
        src="./shield.png"
        alt=""
        className="absolute w-[20vw] -left-[9vw] -bottom-[5vh]"
      />
      <div className="w-4/6 h-60 absolute top-28 left-20  text-white flex flex-col gap-5">
        <h1 className="text-[7vw]  heading -mb-6">OncoCura</h1>
        <h3 className="text-[1.4vw] font-semibold">
          A Smart Cancer Treatment Assistant with an integrated E-commerce.
        </h3>
        <Link to="/">
          <button className="px-10 py-2 rounded-md text-white bg-[#FF3F85]">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeftSection;
