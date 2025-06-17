import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
const API = import.meta.env.VITE_API_BASE_URL;
export default function SignupForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPass) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        `${API}/signup`,
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );

      console.log("Signup success:", res.data);
      toast.success("Registered Succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      toast.error(
        "Signup failed. Try again. " +
          (err.response?.data?.message || err.message),
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
    }
  };
  return (
    <div className="w-full relative flex flex-col justify-center items-center h-full">
      <div className="w-[50vw] h-1/5 border-t-2 absolute right-0 top-0 rounded-tr-md"></div>
      <div className="h-4/5 w-4/5 flex flex-col">
        <div className="w-full h-1/5 text-center flex flex-col gap-3 justify-center items-center">
          <div className="text-white w-full h-3/4 flex  justify-center items-center text-2xl font-bold">
            Sign Up for Certi <span className="text-amber-400">Key</span>
          </div>
          <div className="text-zinc-200 w-full h-1/4 flex justify-center items-center">
            Start managing your passwords efficiently!
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-center">
          <form
            id="signup-form"
            className="flex items-center flex-col gap-5 mt-10 w-full h-3/4 "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-10 w-full justify-center items-center">
              <div className="flex gap-10 ">
                <div className="w-60">
                  <label className="text-white font-bold text-xl" htmlFor="">
                    Username
                  </label>{" "}
                </div>
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="pl-2 border-zinc-500 text-white h-8 border rounded-md w-2/3"
                  type="text"
                />
              </div>
              <div className="flex gap-10 ">
                <div className="w-60">
                  <label className="text-white font-bold text-xl" htmlFor="">
                    Password
                  </label>{" "}
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="Password"
                  className="border-zinc-500 text-white h-8 rounded-md pl-2 border w-2/3"
                  type="password"
                />
              </div>
              <div className="flex gap-10 ">
                <div className="w-60">
                  <label className="text-white font-bold text-xl" htmlFor="">
                    Re-type Password
                  </label>{" "}
                </div>
                <input
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  id="confirmpassword"
                  placeholder="Password"
                  className="border-zinc-500 text-white h-8 rounded-md pl-2 border  w-2/3"
                  type="password"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="h-full gap-10 w-full flex flex-col items-center">
          <div className="  w-1/9 justify-center rounded-md items-center text-center">
            <button
              form="signup-form"
              className="rounded-xl h-10 w-45 text-zinc-900 font-semi-bold bg-zinc-500 gap-2 justify-center items-center flex hover:scale-102 hover:font-bold hover:cursor-pointer"
              type="submit"
            >
              Register Now
            </button>
          </div>
          <div className="flex justify-center items-center text-zinc-100 text-sm hover:cursor-pointer hover:underline">
            Already have an account? Log in here
          </div>
        </div>
      </div>
    </div>
  );
}
