import { useEffect, useRef, useState } from "react";
import axios from "axios";
import eyeCrossed from "../assets/images/eyecrossed.svg";
import eye from "../assets/images/eye.svg";
import PasswordGenerator from "./PasswordGenerator";
const API = import.meta.env.VITE_API_BASE_URL;
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

export default function PasswordManager() {
  const navigate = useNavigate();
  const ref = useRef();
  const [toggle, setToggle] = useState(false);
  const [passinput, setPassinput] = useState("password");
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function viewPassword() {
    setToggle(!toggle);
    console.log(toggle);
  }

  useEffect(() => {
    if (toggle) {
      setPassinput("text");
      ref.current.src = eyeCrossed;
    } else {
      setPassinput("password");
      ref.current.src = eye;
    }
  }, [toggle]);

  const savePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/api/passwords/`,
        {
          site,
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Data Saved", res.data);
      toast.success("Password Saved", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/");
    } catch (err) {
      console.error("Save Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Data Save Error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      navigate("/");
    }
  };

  return (
    <div className="h-[80%] w-full">
      <Nav />
      <div className=" flex  justify-center  md:mt-20 py-[5%]  h-screen md:h-full w-full text-white">
        <div className="mainContainer  h-full md:w-1/2 w-[90%] drop-shadow-zinc-900 flex flex-col justify-center items-center bg-gradient-to-r from-[#323232] to-[#353535] rounded-2xl">
          <div className=" h-full w-full flex justify-center items-center flex-col gap-10 ">
            <div className=" mt-10  w-full text-center text-3xl font-bold ">
              Certi<span className=" text-amber-400">Key</span>
            </div>

            <div className=" w-full flex items-center justify-center ">
              <input
                value={site}
                onChange={(e) => setSite(e.target.value)}
                type="text"
                name="site"
                className=" border border-zinc-500  w-[80%] p-1 rounded-md"
                placeholder="Website URL"
              />
            </div>
            <div className=" flex-col md:flex-row w-full flex justify-center gap-10 items-center">
              <div className="">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  className="  border border-zinc-500 ml-5  w-[80%] rounded-md p-1"
                  placeholder="Username / Email"
                />
              </div>
              <div>
                <button
                  onClick={savePassword}
                  className="rounded-xl h-10 w-45 text-zinc-900 font-semi-bold bg-zinc-500 gap-2 justify-center items-center flex hover:scale-102 hover:font-bold hover:cursor-pointer"
                >
                  Save Password
                  <lord-icon
                    src="https://cdn.lordicon.com/sbnjyzil.json"
                    trigger="loop-on-hover"
                    colors="primary:#110a5c,secondary:#e4e4e4"
                  ></lord-icon>
                </button>
              </div>
              <div className="relative flex justify-center items-center">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={passinput}
                  name="password"
                  className="w-[80%] border border-zinc-500 mr-5   rounded-md p-1"
                  placeholder="Password"
                />
                <span onClick={viewPassword} className="absolute right-9">
                  <img
                    ref={ref}
                    src="src/assets/images/eye.svg"
                    className="h-6 invert"
                    alt=""
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="pass-saved-alert-area h-full w-full items-center    flex flex-col">
            <div className=" h-full w-2/3 justify-center items-center    flex flex-col gap-10 ">
              <div className="   w-full h-full">
                <PasswordGenerator />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
