import { useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;
import { toast, Bounce } from "react-toastify";
function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = async () => {
    try {
      const res = await axios.post(`${API}/api/generatePassword/`, {
        length,
        numbers,
        symbols,
        uppercase,
        lowercase,
        strict: true,
      });
      setPassword(res.data.password);
    } catch (error) {
      console.error("Error generating password:", error);
    }
  };

  const handleClick = (password) => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clip board", {
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
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-4">
        <h2 className="text-xl font-bold">Password Generator</h2>

        <label>
          <div className="flex justify-around pt-4">
            <span className="">Length:</span>
            <span>
              <input
                type="number"
                min={4}
                max={64}
                value={length}
                className=" border rounded-md border-zinc-500 active:border-zinc-50 w-25 text-center"
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </span>
          </div>
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={numbers}
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => setNumbers(!numbers)}
          />
          <span className="pl-4">Include Numbers</span>
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={symbols}
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => setSymbols(!symbols)}
          />
          <span className="pl-4">Include Symbols</span>
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={uppercase}
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => setUppercase(!uppercase)}
          />
          <span className="pl-4">Include Uppercase</span>
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={lowercase}
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => setLowercase(!lowercase)}
          />
          <span className="pl-4">Include Lowercase</span>
        </label>
        <br />

        <button
          onClick={generatePassword}
          className=" mt-5 rounded-xl h-10 w-50 text-zinc-900  bg-zinc-500 gap-2 justify-center items-center flex hover:scale-102 hover:font-bold hover:cursor-pointer"
        >
          Generate Password
        </button>
      </div>
      <div className="flex  mb-10 text-center ">
        {password && (
          <div className="mt-4 flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-5">
              <code>{password}</code>
            </div>
            <button
              onClick={() => handleClick(password)}
              className="mt-5 rounded-xl h-10 w-50 text-zinc-900 font-semi-bold bg-zinc-500 gap-2 justify-center items-center flex hover:scale-102 hover:font-bold hover:cursor-pointer"
            >
              Copy Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordGenerator;
