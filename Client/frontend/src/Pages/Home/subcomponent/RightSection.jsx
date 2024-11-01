import React from "react";

const RightSection = () => {
  return (
    <div className="w-[55%] h-full bg-[#003990] absolute right-0 z-10 overflow-y-hidden">
      <div className="w-56 absolute  top-36 right-16">
        <h1 className="text-[#FF3F85] font-semibold text-[2.3vw] mb-4">
          What You Get?
        </h1>
        <ul className="text-white font-semibold flex flex-col gap-3 list-disc pl-5 text-[1.5vw]">
          <li>AI Assistant</li>
          <li>Get Treatment Plan</li>
          <li>Track Progress</li>
          <li>E store for medicine</li>
        </ul>
      </div>
      <img
        src="./Group 66.png"
        alt=""
        className="w-[15vw] absolute -bottom-[4vh] left-[20vw]"
      />
    </div>
  );
};

export default RightSection;
