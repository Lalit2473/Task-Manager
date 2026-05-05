import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async () => {
    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      nav("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          className="bg-blue-500 text-white w-full py-2 rounded mt-2 hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
