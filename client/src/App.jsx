import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import PasswordManager from "./components/PasswordManager";
import SavedPasswords from "./components/SavedPasswords";
import Login from "./components/Login";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function App() {
  return (
    <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 min-h-screen w-full ;">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PasswordManager />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/savedpasswords"
            element={
              <ProtectedRoute>
                <SavedPasswords />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </BrowserRouter>
    </div>
  );
}
