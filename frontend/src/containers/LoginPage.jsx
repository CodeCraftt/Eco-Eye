import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import { AuthContext } from "../context/AuthContext";

import green from "../assets/images/green.jpg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(AuthContext); // Access user and setUser from AuthContext
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      
      
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const { token, ...user } = response.data;
      
      
      // Store token and user info in Context API
      setUser({ token, ...user});

      // Log the user data (logging response.data directly to avoid asynchronous issues)
      // console.log(response.data);

      // Redirect to the home page
      navigate("/");
    } catch (err) {
      console.log(err);

      setError("Login failed. Please check your credentials and try again.");
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <>

    
      <div
        className="h-[100vh] w-[100vw] flex justify-center items-center bg-cover bg-opacity-55 "
        style={{ backgroundImage: `url(${green})` }}
      >
        <div className="w-[92%] bg-white/55 backdrop-blur-sm md:w-[28%] min-h-[58%]  rounded-lg shadow-lg py-3 gap-10 px-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold ">Login</h1>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <div>
              <label className="block text-[1.1rem]">Email</label>

              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="grow"
                  required
                  placeholder="Enter e-mail here"
                />
              </label>
            </div>

            <div>
              <label className="block text-[1.1rem]">Password</label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  placeholder="Enter password here"
                  type="text"
                  value={password}
                  required
                  className="grow"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <p>
              Does not have account?{" "}
              <Link className="underline" to="/signup">
                Signup
              </Link>
            </p>
            <button
              className="block tracking-wide grow rounded-lg text-white bg-slate-800 py-3 text-[1.2rem]  my-3 hover:bg-slate-900 duration-200"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default LoginPage;


