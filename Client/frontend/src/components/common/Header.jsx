import { useContext } from "react";
import { assets } from "../../../public/assets";
import { Link } from "react-router-dom";
import ShopContext from "../../context/ShopContext";
import LogOut from "../shared/logout/Logout";

const Header = () => {
  const isLoggedIn = localStorage.getItem("login");
  const { getCartCount } = useContext(ShopContext);

  return (
    <div className="w-full h-16 bg-white flex justify-between items-center px-12 shadow-md relative top-0 z-30">
      <div className="w-40 h-full flex justify-center items-center">
        <img src="./OncoCura.png" alt="OncoCura Logo" />
      </div>
      {isLoggedIn === "true" ? (
        <div className="h-full flex justify-center items-center gap-x-6 mr-2">
          <Link to="/cart" className="relative">
            <img
              className="w-7 min-w-7"
              src={assets.cart_icon}
              alt="cart_icon"
            />
            <p className="absolute right-[-2px] bottom-[-2px] w-4 text-center leading-4 bg-[#004DFF] text-white aspect-square rounded-full text-[8px] ">
              {getCartCount()}
            </p>
          </Link>
          <Link to="#" className="relative">
            <img
              className="w-[22px] min-w-[22px]"
              src={assets.order_icon}
              alt="order_icon"
            />
          </Link>

          <LogOut />
        </div>
      ) : (
        <div className="w-72 h-full flex justify-center items-center gap-x-4">
          <Link to="/login">
            <button className="px-10 py-2 rounded-md text-white bg-[#004DFF]">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="border border-black px-10 py-2 rounded-md">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
