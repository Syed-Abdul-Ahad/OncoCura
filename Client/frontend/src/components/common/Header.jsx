import { useGlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { isLoggedIn } = useGlobalContext();

  return (
    <div className="w-full h-16 bg-white flex justify-between px-12 relative top-0 z-30">
      <div className="w-40 h-full flex justify-center items-center">
        <img src="./OncoCura.png" alt="" />
      </div>
      {isLoggedIn ? (
        <div className="w-72 h-full flex justify-center items-center gap-x-4">
          <span className="text-xl font-bold">OncoCura</span>
          {/* <FaShoppingCart className="text-2xl cursor-pointer" /> */}
        </div>
      ) : (
        <div className="w-72 h-full flex justify-center items-center gap-x-4">
          <Link to="/">
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
