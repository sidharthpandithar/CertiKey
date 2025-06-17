import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { toast, Bounce } from "react-toastify";
const API = import.meta.env.VITE_API_BASE_URL;
export default function SavedPasswords() {
  const [passwords, setPasswords] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = () => {
    axios
      .get(`${API}/api/passwords/viewPasswords`, {
        withCredentials: true,
      })
      .then((res) => setPasswords(res.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  const toggleVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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

  const deletePassword = (id) => {
    axios
      .delete(`${API}/api/passwords/deletePassword/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Password deleted", {
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
        fetchPasswords();
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("Failed to delete password", {
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

  return (
    <>
      <Nav />
      <div className="overflow-x-auto p-4">
        <table className="table-auto border-collapse border  w-full text-sm">
          <thead>
            <tr className="bg-[#323232] text-zinc-200 ">
              <th className="border-black border-r px-3 py-2">Site</th>
              <th className="border-black border-r px-3 py-2">Username</th>
              <th className="border-black border-r px-3 py-2">Password</th>
              <th className="border-black border-r px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((entry) => (
              <tr key={entry._id} className="hover:bg-[#525252] text-white ">
                <td className="border-r border-t border-black px-3 py-2">
                  {entry.site}
                </td>
                <td className="border-r border-t border-black px-3 py-2">
                  {entry.username}
                </td>
                <td className="border-r border-t border-black px-3 py-2 ">
                  {visiblePasswords[entry._id] ? entry.password : "••••••••"}
                  <button
                    className="ml-2 text-blue-600 underline text-xs"
                    onClick={() => toggleVisibility(entry._id)}
                  >
                    {visiblePasswords[entry._id] ? "Hide" : "Show"}
                  </button>
                </td>
                <td className="border border-t border-black px-3 py-2 space-x-2">
                  <button
                    onClick={() => copyToClipboard(entry.password)}
                    className="text-green-600 hover:underline text-xs"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => deletePassword(entry._id)}
                    className="text-red-600 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
