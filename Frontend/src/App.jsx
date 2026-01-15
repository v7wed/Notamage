import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import api from "./lib/axios.js";

import HomePage from "./Pages/HomePage.jsx";
import NoteDetail from "./Pages/NoteDetail.jsx";
import SignUp from "./Pages/SignUp.jsx";
import SignIn from "./Pages/SignIn.jsx";
import MyCategories from "./Pages/MyCategories.jsx";
import Settings from "./Pages/Settings.jsx";
import Landing from "./Pages/Landing.jsx";
import About from "./Pages/About.jsx";
import Notfound from "./Pages/Notfound.jsx";
import ChatWithMage from "./Components/ChatWithMage.jsx";
import Loading from "./Components/Loading.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const onSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/users/me");
          setUser(response.data);
          console.log(response.data._id)
        } catch (error) {
          if (error.response.data.name === "TokenExpiredError") {
            localStorage.removeItem("token");
          } else {
            console.error(`Error when fetching user data: ${error.response.data.message}`);
            localStorage.removeItem("token");
          }
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Routes>
        <Route path="/" element={<Landing user={user} onSignOut={onSignOut} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/signin"
          element={
            user ? <HomePage user={user} onSignOut={onSignOut} /> : <SignIn setUser={setUser} onSignOut={onSignOut} />
          }
        />
        <Route
          path="/signup"
          element={
            user ? <HomePage user={user} onSignOut={onSignOut} /> : <SignUp setUser={setUser} onSignOut={onSignOut} />
          }
        />
        <Route
          path="/home"
          element={user ? <HomePage user={user} onSignOut={onSignOut} refreshTrigger={refreshTrigger} /> : <Landing user={user} onSignOut={onSignOut} />}
        />
        <Route path="/note/:id" element={user ? <NoteDetail /> : <Landing user={user} onSignOut={onSignOut} />} />
        <Route
          path="/categories"
          element={user ? <MyCategories user={user} /> : <Landing user={user} onSignOut={onSignOut} />}
        />
        <Route path="/settings" element={user ? <Settings user={user}/> : <Landing user={user} onSignOut={onSignOut} />} />
        <Route path="*" element={<Notfound user={user} onSignOut={onSignOut} />} />
      </Routes>

      {/* Floating chat button */}
      {user && <ChatWithMage user={user} onAgentResponse={triggerRefresh} />}
    </div>
  );
};

export default App;
