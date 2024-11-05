import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const SideBar = () => {
  const { isLoggedIn } = useGlobalContext();
  const userId = localStorage.getItem("userId");

  return (
    <>
      {isLoggedIn && (
        <div className="fixed left-4 mt-16 sm:top-36 sm:left-10 w-10 sm:w-20 h-[360px] bg-white rounded-2xl border border-gray-200 shadow-lg z-40">
          <ul className="flex flex-col items-center p-2 list-none">
            <li className="flex flex-col items-center text-center my-4 sm:my-6 p-2 rounded-lg hover:bg-gray-200">
              <Link
                to="/records"
                className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins"
              >
                <img src="/image.png" alt="Matrix Icon" className="w-6 h-6" />
                <span className="text-[12px] pt-2">MATRIX</span>
              </Link>
            </li>
            <li className="flex flex-col items-center text-center my-4 sm:my-6 p-2 rounded-lg hover:bg-gray-200">
              <Link
                to="/collection"
                className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins"
              >
                <img src="/store.png" alt="E-Store Icon" className="w-6 h-6" />
                <span className="text-[12px] pt-2">ESTORE</span>
              </Link>
            </li>
            <li className="flex flex-col items-center text-center my-4 sm:my-6 p-2 rounded-lg hover:bg-gray-200">
              <Link
                to={`/user-profile/${userId}`}
                className="text-black font-bold text-xs sm:text-sm flex flex-col items-center font-poppins"
              >
                <img src="/user.png" alt="Profile Icon" className="w-6 h-6" />
                <span className="text-[12px] pt-2">PROFILE</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SideBar;
