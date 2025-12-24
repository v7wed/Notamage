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
import Landing from "./Pages/Landing.jsx";
import About from "./Pages/About.jsx";
import Notfound from "./Pages/Notfound.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  const onSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

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
          if (error.response.data.name === "TokenExpiredError") {
            localStorage.removeItem("token");
          } else {
            console.error(`Error when fetching user data: ${error.response.data.message}`);
            localStorage.removeItem("token");
          }
        }
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="relative h-full w-full">
      <Routes>
        <Route path="/" element={<Landing user={user} onSignOut={onSignOut} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/signin"
          element={
            user ? <HomePage user={user} onSignOut={onSignOut} /> : <SignIn setUser={setUser} onSignOut={onSignOut}/>
          }
        />
        <Route
          path="/signup"
          element={
            user ? <HomePage user={user} onSignOut={onSignOut}/> : <SignUp setUser={setUser} onSignOut={onSignOut} />
          }
        />
        <Route
          path="/home"
          element={user ? <HomePage user={user} onSignOut={onSignOut} /> : <Landing user={user} onSignOut={onSignOut} />}
        />
        <Route path="/create" element={user ? <CreatePage user={user}/> : <Landing user={user} onSignOut={onSignOut} />} />
        <Route path="/note/:id" element={user ? <NoteDetail /> : <Landing user={user} onSignOut={onSignOut} />} />
        <Route
          path="/categories"
          element={user ? <MyCategories /> : <Landing user={user} onSignOut={onSignOut} />}
        />
        <Route path="/settings" element={user ? <Settings /> : <Landing user={user} onSignOut={onSignOut} />} />
        <Route path="*" element={<Notfound user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
