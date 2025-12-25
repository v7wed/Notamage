import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { CheckSquare } from "lucide-react";

import api from "../lib/axios.js";
import NavBar from "../Components/NavBar.jsx";
import Loading from "../Components/Loading.jsx";
import NoteCard from "../Components/NoteCard.jsx";
import NotesNotFound from "../Components/NotesNotFound.jsx";
import AddToModal from "../Components/AddTo.jsx";

const HomePage = ({ user, onSignOut }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [categs, setCategs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catMode, setCatMode] = useState(false);
  const [showAddToModal, setShowAddToModal] = useState(false);

  // Compute mode based on selectedNotes - if any are selected, we're in selection mode
  const mode = selectedNotes.length > 0 ? "home_se" : "home";

  // Fetch notes and categories
  const fetchData = async () => {
    try {
      const notesRes = await api.get(`/notes/user/${user._id}?search=${search}`);
      const categRes = await api.get(`/categ/for/${user._id}`);
      setNotes(notesRes.data);
      setCategs(categRes.data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [search, user._id]);

  // Toggle a note's selection status
  const handleToggleSelect = (noteId) => {
    setSelectedNotes((prev) => {
      if (prev.includes(noteId)) {
        return prev.filter((id) => id !== noteId);
      } else {
        return [...prev, noteId];
      }
    });
  };

  // Select all notes (used in regular view)
  const handleSelectAll = () => {
    const allNoteIds = notes.map((note) => note._id);
    setSelectedNotes(allNoteIds);
  };

  // Select all notes in a specific category (used in category view)
  const handleSelectAllInCategory = (categoryNotes) => {
    const categoryNoteIds = categoryNotes.map((note) => note._id);
    setSelectedNotes((prev) => {
      // Add these IDs to selection (avoiding duplicates)
      const newSelection = [...prev];
      categoryNoteIds.forEach((id) => {
        if (!newSelection.includes(id)) {
          newSelection.push(id);
        }
      });
      return newSelection;
    });
  };

  // Clear all selections (cancel selection mode)
  const handleClearSelection = () => {
    setSelectedNotes([]);
  };

  // Open Add To modal
  const handleOpenAddTo = () => {
    setShowAddToModal(true);
  };

  // Handle successful category assignment
  const handleAddToSuccess = () => {
    setSelectedNotes([]);
    fetchData(); // Refresh data
  };

  // Delete selected notes
  const handleDeleteSelected = async () => {
    if (selectedNotes.length === 0) return;

    const confirmMessage = `Are you sure you want to delete ${selectedNotes.length} note${selectedNotes.length > 1 ? 's' : ''}?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      await Promise.all(
        selectedNotes.map((id) => api.delete(`/notes/${id}`))
      );

      toast.success(`Deleted ${selectedNotes.length} note${selectedNotes.length > 1 ? 's' : ''}`);
      setNotes((prev) => prev.filter((note) => !selectedNotes.includes(note._id)));
      setSelectedNotes([]);
    } catch (error) {
      console.error("Error deleting notes:", error);
      toast.error("Failed to delete some notes");
    }
  };

  // Create a category lookup map
  const categoriesMap = categs.reduce((acc, cat) => {
    acc[cat._id] = cat.name;
    return acc;
  }, {});

  // Group notes by category for the Category View
  const groupedNotes = notes.reduce((acc, note) => {
    const catId = note.categoryID || "uncategorized";
    if (!acc[catId]) acc[catId] = [];
    acc[catId].push(note);
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
        onOpenAddTo={handleOpenAddTo}
        catMode={catMode}
        setCatMode={setCatMode}
      />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <Loading />}

        {notes.length === 0 && !loading && <NotesNotFound search={search} />}

        {/* Select All Button - appears in selection mode (regular view) */}
        {!catMode && notes.length > 0 && mode === "home_se" && (
          <div className="mb-4">
            <button
              onClick={handleSelectAll}
              className="btn btn-ghost btn-sm font-medieval gap-2 border border-primary/30 hover:border-primary"
            >
              <CheckSquare className="size-4" />
              Select All ({notes.length})
            </button>
          </div>
        )}

        {/* Regular View: Grid of all notes */}
        {!catMode && notes.length > 0 && (
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

        {/* Category View: Grouped by category */}
        {catMode && notes.length > 0 && (
          <div className="space-y-12">
            {Object.entries(groupedNotes).map(([catId, items]) => (
              <section key={catId} className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <h2 className="text-2xl font-medieval text-primary border-b-2 border-primary/20 pb-1">
                    {categoriesMap[catId] || "Uncategorized Scrolls"}
                  </h2>
                  <span className="text-sm font-medieval text-base-content/40 mt-1">
                    ({items.length} {items.length === 1 ? 'scroll' : 'scrolls'})
                  </span>

                  {/* Select All in Category Button - appears in selection mode */}
                  {mode === "home_se" && (
                    <button
                      onClick={() => handleSelectAllInCategory(items)}
                      className="btn btn-ghost btn-xs font-medieval gap-1 border border-primary/30 hover:border-primary ml-auto"
                    >
                      <CheckSquare className="size-3" />
                      Select All
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((note) => (
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
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Add To Modal */}
      <AddToModal
        isOpen={showAddToModal}
        onClose={() => setShowAddToModal(false)}
        selectedNotes={selectedNotes}
        categories={categs}
        userId={user._id}
        onSuccess={handleAddToSuccess}
      />
    </div>
  );
};

export default HomePage;
