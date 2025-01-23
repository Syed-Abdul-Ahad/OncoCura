import React from "react";
import LeftSection from "./subcomponent/LeftSection";
import RightSection from "./subcomponent/RightSection";

const Home = () => {
  return (
    <div className="w-full relative h-[90.9vh] flex z-40 overflow-hidden">
      <LeftSection />
      <RightSection />
      <img
        src="./rb_30020.png"
        alt=""
        className="z-40 w-[32.5vw] h-auto absolute left-[33.5vw] top-[20vh]"
      />
    </div>
  );
};

export default Home;
