import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const dummyAccounts = {
  "company@example.com": { role: "Company", password: "1234", redirect: "/register-company" },
  "student@example.com": { role: "Student", password: "1234", redirect: "/student-dashboard" },
  "pro@example.com": { role: "PRO Student", password: "1234", redirect: "/pro-dashboard" },
  "scad@example.com": { role: "SCAD Office", password: "1234", redirect: "/scad-dashboard" },
  "faculty@example.com": { role: "Faculty Member", password: "1234", redirect: "/faculty-dashboard" },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const account = dummyAccounts[email.toLowerCase()];
    if (account && password === account.password) {
      navigate(account.redirect);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Login to SCAD System</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
        >
          Login
        </button>

        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Use:</p>
          <ul className="mt-2 space-y-1 text-left text-xs text-gray-700">
            {Object.entries(dummyAccounts).map(([email, { role }]) => (
              <li key={email}>
                <strong>{role}</strong>: {email} / <code>1234</code>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
