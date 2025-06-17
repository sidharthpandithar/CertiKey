import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center w-full h-full">
        <div className=" m-20  w-2/3 ">
          <div className="flex text-center">
            <div
              onClick={() => navigate("/login")}
              className="text-xl pt-1 hover:cursor-pointer border-black text-zinc-400 border-2 rounded-t-md w-1/8 h-10 rounded-br-md"
            >
              Login
            </div>
            <div className="border-t-2 hover:cursor-default  bg-[#323232] text-xl border-black text-zinc-100 pt-1 border-r-2  w-1/8 h-10 rounded-t-md ">
              Signup
            </div>
          </div>
          <div className="h-full bg-[#323232] w-full border-l-2 border-b-2 border-r-2 rounded-b-md rounded-tr-xl">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
}
