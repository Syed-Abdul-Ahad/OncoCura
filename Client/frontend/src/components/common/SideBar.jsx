// import React from "react";

// const SideBar = () => {
//   return (
//     <div className="fixed top-20 left-4 sm:top-36 sm:left-10 w-16 sm:w-20 h-[300px] sm:h-[430px] bg-white rounded-2xl border border-gray-200 shadow-lg z-40">
//       <ul className="flex flex-col items-center p-2 list-none">
        
//         <li className="flex flex-col items-center text-center my-4 sm:my-6">
//           <a
//             href="/records"
//             className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins"
//           >
//             <img
//               src={"/health.png"}
//               alt="Health Icon"
//               className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2"
//             />
//             <span>PLAN</span>
//           </a>
//         </li>
//         <li className="flex flex-col items-center text-center my-4 sm:my-6">
//           <a
//             href="/collection"
//             className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins"
//           >
//             <img
//               src={"/store.png"}
//               alt="E-Store Icon"
//               className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2"
//             />
//             <span>ESTORE</span>
//           </a>
//         </li>
//         <li className="flex flex-col items-center text-center my-4 sm:my-6">
//           <a
//             href="/user-profile/:id"
//             className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins"
//           >
//             <img
//               src={"/user.png"}
//               alt="Profile Icon"
//               className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2"
//             />
//             <span>PROFILE</span>
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default SideBar;


import React, { useState } from "react";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("plan"); // default active item

  return (
    <div className="fixed top-20 left-4 sm:top-36 sm:left-10 w-16 sm:w-[86px] h-[250px] sm:h-[350px] bg-white rounded-2xl border border-gray-200 shadow-lg z-40">
      <ul className="flex flex-col items-center p-2 list-none justify-between h-full">
        <li className="flex flex-col items-center text-center my-2 sm:my-4">
          <a
            href="/records"
            onClick={() => setActiveItem("plan")}
            className={`${
              activeItem === "plan" ? "bg-[#e9e9e9] rounded-md" : ""
            } text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins p-2 transition duration-200 ease-in-out hover:bg-[#e9e9e9] hover:rounded-md`}
            style={{ width: '64px', height: '64px' }} // Fixed dimensions
          >
            <img
              src={"/health.png"}
              alt="Health Icon"
              className="w-7 h-7 mb-1 sm:mb-2"
            />
            <span className="text-xs sm:text-xs">PLAN</span>
          </a>
        </li>
        <li className="flex flex-col items-center text-center my-2 sm:my-4">
          <a
            href="/collection"
            onClick={() => setActiveItem("estore")}
            className={`${
              activeItem === "estore" ? "bg-[#e9e9e9] rounded-md" : ""
            } text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins p-2 transition duration-200 ease-in-out hover:bg-[#e9e9e9] hover:rounded-md`}
            style={{ width: '64px', height: '64px' }} // Fixed dimensions
          >
            <img
              src={"/store.png"}
              alt="E-Store Icon"
              className="w-7 h-7 mb-1 sm:mb-2"
            />
            <span className="text-xs sm:text-xs">ESTORE</span>
          </a>
        </li>
        <li className="flex flex-col items-center text-center my-2 sm:my-4">
          <a
            href="/user-profile/:id"
            onClick={() => setActiveItem("profile")}
            className={`${
              activeItem === "profile" ? "bg-[#e9e9e9] rounded-md" : ""
            } text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins p-2 transition duration-200 ease-in-out hover:bg-[#e9e9e9] hover:rounded-md`}
            style={{ width: '64px', height: '64px' }} // Fixed dimensions
          >
            <img
              src={"/user.png"}
              alt="Profile Icon"
              className="w-7 h-7 mb-1 sm:mb-2"
            />
            <span className="text-xs sm:text-xs">PROFILE</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
