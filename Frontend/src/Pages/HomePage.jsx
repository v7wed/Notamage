import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import api from "../lib/axios.js";
import NavBar from "../Components/NavBar.jsx";
import Loading from "../Components/Loading.jsx";
import NoteCard from "../Components/NoteCard.jsx";
import NotesNotFound from "../Components/NotesNotFound.jsx";

const HomePage = ({ user, onSignOut }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [categs, setCategs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  // Compute mode based on selectedNotes - if any are selected, we're in selection mode
  const mode = selectedNotes.length > 0 ? "home_se" : "home";

  // Fetch notes effect
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesRes = await api.get(`/notes/user/${user._id}?search=${search}`);
        const categRes = await api.get(`/categ/for/${user._id}`)
        setNotes(notesRes.data);
        setCategs(categRes.data);
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
    }, 500);
    return () => clearTimeout(timer);
  }, [search, user._id]);

  // Toggle a note's selection status
  const handleToggleSelect = (noteId) => {
    setSelectedNotes((prev) => {
      if (prev.includes(noteId)) {
        // Remove from selection
        return prev.filter((id) => id !== noteId);
      } else {
        // Add to selection
        return [...prev, noteId];
      }
    });
  };

  // Clear all selections (cancel selection mode)
  const handleClearSelection = () => {
    setSelectedNotes([]);
  };

  // Delete selected notes
  const handleDeleteSelected = async () => {
    if (selectedNotes.length === 0) return;

    const confirmMessage = `Are you sure you want to delete ${selectedNotes.length} note${selectedNotes.length > 1 ? 's' : ''}?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      // Delete all selected notes
      await Promise.all(
        selectedNotes.map((id) => api.delete(`/notes/${id}`))
      );

      toast.success(`Deleted ${selectedNotes.length} note${selectedNotes.length > 1 ? 's' : ''}`);

      // Remove deleted notes from the list
      setNotes((prev) => prev.filter((note) => !selectedNotes.includes(note._id)));

      // Clear selection (this also switches mode back to "home")
      setSelectedNotes([]);
    } catch (error) {
      console.error("Error deleting notes:", error);
      toast.error("Failed to delete some notes");
    }
  };

  // Create a category lookup map for efficiency: { "id123": "Work", "id456": "Personal" }
  const categoriesMap = categs.reduce((acc, cat) => {
    acc[cat._id] = cat.name;
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      <NavBar
        mode={mode}
        selectedNotes={selectedNotes}
        onSignOut={onSignOut}
        user={user}
        setSearch={setSearch}
        onClearSelection={handleClearSelection}
        onDeleteSelected={handleDeleteSelected}
      />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <Loading />}

        {notes.length === 0 && !loading && <NotesNotFound search={search} />}

        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                data={note}
                isSelected={selectedNotes.includes(note._id)}
                onToggleSelect={handleToggleSelect}
                isSelectionMode={mode === "home_se"}
                categoryName={categoriesMap[note.categoryID]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

