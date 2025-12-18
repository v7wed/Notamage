import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import api from "./lib/axios.js";

import HomePage from "./Pages/HomePage.jsx";
import CreatePage from "./Pages/CreatePage.jsx";
import NoteDetail from "./Pages/NoteDetail.jsx";
import SignUp from "./Pages/SignUp.jsx";
import SignIn from "./Pages/SignIn.jsx";
import MyCategories from "./Pages/MyCategories.jsx";
import Settings from "./Pages/Settings.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data");
          localStorage.removeItem("token");
        }
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/categories" element={<MyCategories />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default App;
