import React from "react";
import style from "../../../Styles/LoginSideComponent.module.css";

const SideComponent = () => {
  return (
    <div className={`relative w-[100vw] bg-[#004dff] ${style.clipShape}`}>
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <img
          src="./rb_134418.png"
          alt="robot"
          className="w-[20vw] h-[60vh]  "
        />
        <h2 className="text-white text-4xl font-bold">Welcome Back!</h2>
      </div>
      <div className="absolute w-[44.2vw] h-full my-[-46vw]">
        <img
          src="./Group 65.png"
          alt=""
          className="absolute ml-[28rem] mt-[-4rem] w-[15rem]"
        />
        <img
          src="./virus.png"
          alt=""
          className="absolute ml-[-7.3rem] mt-[22rem] w-[15rem] transform rotate-12"
        />
        <img
          src="./Group 66.png"
          alt=""
          className="absolute ml-[35rem] mt-[37rem] w-[12vw]"
        />
      </div>
    </div>
  );
};

export default SideComponent;
