import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white flex flex-col p-5">
        <h1 className="text-xl font-bold mb-8">Task Manager</h1>

        <Link to="/" className="mb-3 hover:text-gray-300">
          Dashboard
        </Link>

        <Link to="/login" className="mb-3 hover:text-gray-300">
          Login
        </Link>

        <Link to="/signup" className="mb-3 hover:text-gray-300">
          Signup
        </Link>

        <div className="mt-auto">
          {user && (
            <button
              onClick={() => {
                logout();
                nav("/login");
              }}
              className="bg-red-500 w-full py-2 rounded mt-4"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  );
}
