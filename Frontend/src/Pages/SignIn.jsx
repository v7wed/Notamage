import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import api from "../lib/axios.js";

const SignIn = ({ setUser }) => {
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/users/signin", {
        Email: Email,
        Password: Pass,
      });
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      console.log(
        `local storage item looks like this \n ${localStorage.getItem("token")}`
      );
      setUser(response.data);
      navigate("/");
    } catch (error) {
      console.error(`error in handleSubmit in signin page ${error}`);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign In Page
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
              type="email"
              name="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400"
              type="password"
              value={Pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
