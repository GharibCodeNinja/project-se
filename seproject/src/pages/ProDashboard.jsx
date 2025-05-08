import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

const ProDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("pro_logged_in");
    if (token === "true") setLoggedIn(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "omar" && password === "omar") {
      localStorage.setItem("pro_logged_in", "true");
      setLoggedIn(true);
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <Layout>
      {!loggedIn ? (
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl animate-fadeIn"
        >
          <h2 className="text-2xl font-extrabold text-blue-800 mb-4 text-center">
            PRO Student Login
          </h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            required
          />
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
          >
            Log In
          </button>
        </form>
      ) : (
        <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl animate-fadeIn text-center">
          <h1 className="text-3xl font-extrabold text-blue-800 mb-4">
            Welcome, PRO Student!
          </h1>
          <p className="text-gray-700">
            This is your PRO dashboard to manage student support.
          </p>
        </div>
      )}
    </Layout>
  );
};

export default ProDashboard;
