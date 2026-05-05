import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({});
  const nav = useNavigate();

  const submit = async () => {
    await API.post("/auth/signup", form);
    nav("/login");
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

        <input
          className="input"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="input"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={submit}
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
