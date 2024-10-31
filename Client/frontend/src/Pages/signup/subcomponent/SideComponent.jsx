import React from "react";
import style from "../../../Styles/SignupSideComponent.module.css";

const SideComponent = () => {
  return (
    <div className={`relative w-[100vw] bg-[#004dff] ${style.clipShape}`}>
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <img src="./rb_4114.png" alt="robot" className="w-[20vw] h-[50vh]  " />
        <img
          src="./rb_135930.png"
          alt=""
          className="absolute w-[20rem] ml-[-17rem] mt-[-25rem]"
        />
        <p className="absolute ml-[-16rem] mt-[-27rem] text-2xl w-[10rem] font-extrabold">
          Don't have an account?
        </p>
        <h2 className="text-white text-4xl font-bold">Create One!</h2>
      </div>
      <div className="absolute w-[44.2vw] h-full my-[-46vw]">
        <img
          src="./Group 65.png"
          alt=""
          className="absolute ml-[32rem] mt-[-4rem] w-[15rem]"
        />
        <img
          src="./virus.png"
          alt=""
          className="absolute ml-[-6rem] mt-[22rem] w-[15rem] transform rotate-12"
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
