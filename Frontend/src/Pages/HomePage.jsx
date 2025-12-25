import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import api from "../lib/axios.js";
import NavBar from "../Components/NavBar.jsx";
import Loading from "../Components/Loading.jsx";
import NoteCard from "../Components/NoteCard.jsx";
import NotesNotFound from "../Components/NotesNotFound.jsx";

const HomePage = ({ user, onSignOut }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/user/${user._id}?search=${search}`);
        setNotes(res.data);
      } catch (error) {
        console.error("Too many requests error detected", error);
        toast.error("Failed to load notes");
        console.log("Fetching Notes failed: ---> ", error);

      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(() => {
      fetchNotes();
    }, 500)
    return () => clearTimeout(timer);
  }, [search, user._id]);




  return (
    <div className="min-h-screen">
      <NavBar mode="home" onSignOut={onSignOut} user={user} setSearch={setSearch} />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <Loading />}

        {notes.length == 0 && !loading && <NotesNotFound />}

        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} data={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
