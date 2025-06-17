import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_BASE_URL;
import { toast, Bounce } from "react-toastify";

export default function Nav() {
  const handleLogout = () => {
    axios
      .get(`${API}/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
        toast.success("Logged out succesfully", {
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
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        toast.error("Error while logging out", {
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
      });
  };
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center text-white bg-[#323232] w-full h-[6%] p-3">
      <span
        onClick={() => navigate("/")}
        className="Logo hover:cursor-pointer font-bold text-2xl  text-white"
      >
        Certi<span className=" text-amber-400">Key</span>
      </span>
      <div className="flex gap-10 font-semibold ">
        <span
          onClick={() => navigate("/")}
          className="hover:text-zinc-200 hover:scale-102 hover:cursor-pointer"
        >
          Home
        </span>
        <span
          onClick={() => navigate("/savedpasswords")}
          className="hover:text-zinc-200 hover:scale-102 hover:cursor-pointer"
        >
          My Passwords
        </span>
        <span
          onClick={handleLogout}
          className="hover:text-zinc-200 hover:scale-102 hover:cursor-pointer"
        >
          Logout
        </span>
      </div>
    </nav>
  );
}
