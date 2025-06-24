import LoginForm from "./LoginForm";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center w-full h-full">
        <div className=" md:m-20 my-20 md:w-1/2 h-[70vh] ">
          <div className="flex text-center ">
            <div className="border-t-2 hover:cursor-default  bg-[#323232] text-xl border-black text-zinc-100 pt-1 border-r-2 border-l-2  w-30 md:w-1/8 h-10 rounded-t-md ">
              Login
            </div>
            <div
              onClick={() => navigate("/signup")}
              className="border-t-2 hover:cursor-pointer border-r-2 text-xl pt-1 border-black text-zinc-400 md:w-1/8 w-30 h-10 rounded-t-md "
            >
              <span>Signup</span>
            </div>
          </div>
          <div className="h-full w-full border-l-2 border-b-2 border-r-2 rounded-b-md rounded-tr-xl">
            <LoginForm></LoginForm>
          </div>
        </div>
      </div>
    </>
  );
}
