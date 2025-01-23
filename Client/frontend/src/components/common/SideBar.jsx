// import React, { useState } from "react";
// import { useGlobalContext } from "../../context/GlobalContext";

// const SideBar = () => {
  // const [activeItem, setActiveItem] = useState("plan");
  // const { isLoggedIn } = useGlobalContext();
  // const userId = localStorage.getItem("userId");

//   return (
//     <>
//       {isLoggedIn && (
//         <div className="fixed top-20 left-4 sm:top-36 sm:left-10 w-16 sm:w-[86px] h-[250px] sm:h-[350px] bg-white rounded-2xl border border-gray-200 shadow-lg z-40">
//           <ul className="flex flex-col items-center p-2 list-none justify-between h-full">
//             <li className="flex flex-col items-center text-center my-2 sm:my-4">
//               <a
//                 href="/records"
//                 onClick={() => setActiveItem("plan")}
//                 className={`${
//                   activeItem === "plan" ? "bg-[#e9e9e9] rounded-md" : ""
//                 } text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins p-2 transition duration-200 ease-in-out hover:bg-[#e9e9e9] hover:rounded-md`}
//                 style={{ width: "64px", height: "64px" }}
//               >
//                 <img
//                   src={"/health.png"}
//                   alt="Health Icon"
//                   className="w-7 h-7 mb-1 sm:mb-2"
//                 />
//                 <span className="text-xs sm:text-xs">PLAN</span>
//               </a>
//             </li>
//             <li className="flex flex-col items-center text-center my-2 sm:my-4">
//               <a
//                 href="/collection"
//                 onClick={() => setActiveItem("estore")}
//                 className={`${
//                   activeItem === "estore" ? "bg-[#e9e9e9] rounded-md" : ""
//                 } text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins p-2 transition duration-200 ease-in-out hover:bg-[#e9e9e9] hover:rounded-md`}
//                 style={{ width: "64px", height: "64px" }}
//               >
//                 <img
//                   src={"/store.png"}
//                   alt="E-Store Icon"
//                   className="w-7 h-7 mb-1 sm:mb-2"
//                 />
//                 <span className="text-xs sm:text-xs">ESTORE</span>
//               </a>
//             </li>
//             <li className="flex flex-col items-center text-center my-2 sm:my-4">
//               <a
//                 href={`/user-profile/${userId}`}
//                 onClick={() => setActiveItem("profile")}
//                 className={`${
//                   activeItem === "profile" ? "bg-[#e9e9e9] rounded-md" : ""
//                 } text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins p-2 transition duration-200 ease-in-out hover:bg-[#e9e9e9] hover:rounded-md`}
//                 style={{ width: "64px", height: "64px" }}
//               >
//                 <img
//                   src={"/user.png"}
//                   alt="Profile Icon"
//                   className="w-7 h-7 mb-1 sm:mb-2"
//                 />
//                 <span className="text-xs sm:text-xs">PROFILE</span>
//               </a>
//             </li>
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default SideBar;


import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const SideBar = () => {
  const { isLoggedIn } = useGlobalContext();
  const userId = localStorage.getItem("userId");

  return (
    <>
      {isLoggedIn && (
        <div className="fixed top-20 left-4 sm:top-36 sm:left-10 w-16 sm:w-[86px] h-[250px] sm:h-[350px] bg-white rounded-2xl border border-gray-200 shadow-lg z-40">
          <ul className="flex flex-col items-center p-2 list-none justify-between h-full">
            <li className="flex flex-col items-center text-center my-2 sm:my-4">
              <NavLink
                to="/records"
                className={({ isActive }) =>
                  `text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins p-2 transition duration-200 ease-in-out hover:bg-[#e9e9e9] hover:rounded-md ${
                    isActive ? "bg-[#e9e9e9] rounded-md" : ""
                  }`
                }
                style={{ width: "64px", height: "64px" }}
              >
                <img
                  src="/health.png"
                  alt="Health Icon"
                  className="w-7 h-7 mb-1 sm:mb-2"
                />
                <span className="text-xs sm:text-xs">PLAN</span>
              </NavLink>
            </li>

            <li className="flex flex-col items-center text-center my-2 sm:my-4">
              <NavLink
                to="/collection"
                className={({ isActive }) =>
                  `text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins p-2 transition duration-200 ease-in-out hover:bg-[#e9e9e9] hover:rounded-md ${
                    isActive ? "bg-[#e9e9e9] rounded-md" : ""
                  }`
                }
                style={{ width: "64px", height: "64px" }}
              >
                <img
                  src="/store.png"
                  alt="E-Store Icon"
                  className="w-7 h-7 mb-1 sm:mb-2"
                />
                <span className="text-xs sm:text-xs">ESTORE</span>
              </NavLink>
            </li>

            <li className="flex flex-col items-center text-center my-2 sm:my-4">
              <NavLink
                to={`/user-profile/${userId}`}
                className={({ isActive }) =>
                  `text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins p-2 transition duration-200 ease-in-out hover:bg-[#e9e9e9] hover:rounded-md ${
                    isActive ? "bg-[#e9e9e9] rounded-md" : ""
                  }`
                }
                style={{ width: "64px", height: "64px" }}
              >
                <img
                  src="/user.png"
                  alt="Profile Icon"
                  className="w-7 h-7 mb-1 sm:mb-2"
                />
                <span className="text-xs sm:text-xs">PROFILE</span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SideBar;
