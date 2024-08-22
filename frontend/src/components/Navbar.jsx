import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Assuming you have an AuthContext set up
import toast from "react-hot-toast";

const Navbar = ({ bgg }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user,setUser} = useContext(AuthContext); // Access user and logout from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust the scroll distance as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null); // Call the logout function from your AuthContext
    toast.success("Successfully logged out");
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <div className={`navbar fixed top-0 left-0 w-full px-4 md:px-20 py-3 font-sans z-50 transition-all duration-300 ${
        bgg || isScrolled ? "bg-white/10 backdrop-blur-sm shadow-md text-green-900" : "text-white bg-transparent"
      }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-green-900"
          >
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/clean-request'} className="text-center">Clean Zone Request</Link>
            </li>
            <li>
              <Link to={'/suggest'}>EcoGuide</Link>
            </li>
            <li>
              <Link to={'/dump'}>Dump yard</Link>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">ECOeye</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 justify-center items-center text-[16px] font-[400]">
          <li className="mr-6">
            <Link to={'/'}>Home</Link>
          </li>
          <li className="mr-6">
            <Link to={'/clean-request'} className="text-center">Clean Zone <br /> Request</Link>
          </li>
          <li className="mr-6">
            <Link to={'/suggest'}>EcoGuide</Link>
          </li>
          <li>
            <Link to={'/dump'}>Dump yard</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <>
            <button onClick={handleLogout} className="btn">Logout</button>
            <div className="dropdown dropdown-end border-2 border-black rounded-full">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Link to="/profile">
                    <img
                      alt="User Avatar"
                      src={user.avatar || "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e53523cf3aa4b6f462b2ec0_peep-17.svg"} // Replace with user's avatar if available
                    />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Link to='/login' className="btn">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
