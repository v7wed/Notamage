import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import api from "../lib/axios.js";
import NavBar from "../Components/NavBar.jsx";
import RateLimitedUI from "../Components/RateLimitedUI.jsx";
import Loading from "../Components/Loading.jsx";
import NoteCard from "../Components/NoteCard.jsx";
import NotesNotFound from "../Components/NotesNotFound.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        console.log(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response.status === 429) {
          console.error("Too many requests error detected", error);
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
          console.log("Fetching Notes failed: ---> ", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <Loading />}

        {notes.length == 0 && !isRateLimited && !loading && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} data={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
