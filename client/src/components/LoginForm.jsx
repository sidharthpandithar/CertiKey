import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_BASE_URL;
import { toast, Bounce } from "react-toastify";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login success:", res.data);

      toast.success("Logged in successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);

      toast.error(
        "Login failed. " + (err.response?.data?.message || err.message),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
      navigate("/login");
    }
  };

  return (
    <div className="w-full relative flex flex-col bg-[#323232] overflow-hidden rounded-r-md rounded-b-md justify-center items-center h-full">
      <div className="w-[58.3vw] h-1/5 border-t-2  absolute right-0 top-0 rounded-tr-md"></div>
      <div className="h-4/5 w-4/5 flex flex-col">
        <div className="w-full h-1/5 text-center gap-3 flex flex-col justify-center items-center">
          <div className="text-white w-full h-3/4 flex justify-center items-center text-2xl font-bold">
            <span className=" whitespace-break-spaces"> Sign </span>{" "}
            <span className="text-amber-400"> In</span>
          </div>
          <div className="text-zinc-200 w-full h-1/4 flex  justify-center items-center">
            Sign into your account
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-center  ">
          <form
            id="login-form"
            className="flex items-center flex-col gap-10 mt-10"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-5 ">
              <div className="w-25">
                <label className="text-white font-bold text-xl" htmlFor="">
                  Username
                </label>{" "}
              </div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                placeholder="Username"
                className="h-8 text-white pl-2 border border-zinc-500 rounded-md w-3/4"
                type="text"
              />
            </div>
            <div className="flex gap-5 ">
              <div className="w-25">
                <label className="text-white  font-bold text-xl" htmlFor="">
                  Password
                </label>{" "}
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Password"
                className="border-zinc-500 text-white h-8 rounded-md pl-2 border w-3/4"
                type="password"
              />
            </div>
          </form>
        </div>
        <div className="h-full gap-10 w-full flex flex-col items-center ">
          <div className=" w-1/9 justify-center rounded-md items-center text-center ">
            <button
              form="login-form"
              type="submit"
              className="rounded-xl h-10 w-45 text-zinc-900 font-semi-bold bg-zinc-500 gap-2 justify-center items-center flex hover:scale-102 hover:font-bold hover:cursor-pointer"
            >
              Login
            </button>
          </div>
          <div
            onClick={() => navigate("/signup")}
            className="flex justify-center items-center text-zinc-100 text-sm hover:cursor-pointer hover:underline"
          >
            Don't have an account? Sign up here
          </div>
        </div>
      </div>
    </div>
  );
}
