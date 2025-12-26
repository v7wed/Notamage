import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Search, Feather, Filter, Trash2, X, FolderPlus, Clock, LoaderIcon } from "lucide-react";
import { toast } from "react-hot-toast";

import api from "../lib/axios";
import Logo from "./Logo.jsx";
import UserProfileDropdown from "./UserProfileDropdown.jsx";

const VARIANTS = {
  text: "text-sm font-medieval text-base-content/70 hover:text-primary transition-colors",
  ghost: "btn btn-ghost btn-sm font-medieval",
  primary: "btn btn-primary btn-sm font-medieval",
};

const Navbar = ({
  selectedNotes = [],
  setSearch,
  mode = "landing",
  user = null,
  onSignOut,
  onClearSelection,
  onDeleteSelected,
  onOpenAddTo,
  catMode,
  setCatMode
}) => {
  const [creatingNote, setCreatingNote] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCreateNote = async () => {
    if (!user?._id) {
      toast.error("Please sign in to create notes");
      return;
    }

    setCreatingNote(true);
    try {
      const response = await api.post("/notes", {
        title: "",
        content: "",
        userID: user._id
      });
      const newNote = response.data;
      navigate(`/note/${newNote._id}`);
    } catch (error) {
      console.error("Error creating note:", error);
      if (error.response?.status === 429) {
        toast.error("Too many requests, please wait", { icon: "💀" });
      } else {
        toast.error("Failed to create new scroll");
      }
    } finally {
      setCreatingNote(false);
    }
  };

  const selectionCount = selectedNotes.length;

  return (
    <header className="bg-base-300/30 backdrop-blur-md border-b border-base-content/10 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Logo textSize="text-xl sm:text-3xl" iconSize="size-6 sm:size-8" />

          {/* Search Bar - hidden in selection mode */}
          {mode === "home" && (
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/50 group-focus-within:text-primary pointer-events-none transition-colors" />
                <input
                  type="text"
                  placeholder="Search your mystical scrolls..."
                  className="input w-full pl-12 pr-4 bg-base-100 border border-base-content/20 focus:border-primary focus:outline-none font-medieval text-base placeholder:text-base-content/40 transition-colors"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Selection Mode Indicator - shows count when selecting */}
          {mode === "home_se" && (
            <div className="flex-1 flex items-center justify-center">
              <span className="font-medieval text-primary text-lg">
                {selectionCount} {selectionCount === 1 ? 'scroll' : 'scrolls'} selected
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Landing page - not logged in */}
            {mode === "landing" && !user && (
              <>
                <Link to="/about" className={`${VARIANTS.text} hidden sm:block`}>
                  About
                </Link>
                <Link to="/signin" className={VARIANTS.ghost}>
                  <span>Sign In</span>
                </Link>
                <Link to="/signup" className={VARIANTS.primary}>
                  <span className="hidden sm:inline">Join the Mage</span>
                  <span className="inline sm:hidden">Join</span>
                </Link>
              </>
            )}

            {/* Landing page - logged in */}
            {mode === "landing" && user && (
              <>
                <Link to="/home" className={VARIANTS.primary}>
                  <span>My Notes</span>
                </Link>
                <UserProfileDropdown onSignOut={onSignOut} />
              </>
            )}

            {/* Home mode - normal browsing */}
            {mode === "home" && (
              <>
                <button
                  onClick={handleCreateNote}
                  disabled={creatingNote}
                  className="btn btn-primary btn-sm gap-1 font-medieval"
                >
                  {creatingNote ? (
                    <LoaderIcon className="size-4 animate-spin" />
                  ) : (
                    <Feather className="size-4" />
                  )}
                  <span className="hidden sm:inline">{creatingNote ? 'Creating...' : 'Create'}</span>
                </button>

                {/* Filter Dropdown */}
                <div className="dropdown dropdown-end">
                  <button tabIndex={0} className="btn btn-ghost btn-sm gap-1 font-medieval border border-primary/30 hover:border-primary">
                    <Filter className="size-4" />
                    <span className="hidden sm:inline">{catMode ? 'Category' : 'Filter'}</span>
                  </button>
                  <ul tabIndex={0} className="dropdown-content z-[2] menu p-2 shadow-2xl bg-base-200 border border-base-content/10 rounded-box w-40 font-medieval mt-2">
                    <li>
                      <button onClick={() => setCatMode(false)} className={!catMode ? 'bg-primary/20 text-primary' : ''}>
                        <Clock className="size-4" /> Recent
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setCatMode(true)} className={catMode ? 'bg-primary/20 text-primary' : ''}>
                        <FolderPlus className="size-4" /> Category
                      </button>
                    </li>
                  </ul>
                </div>

                <UserProfileDropdown onSignOut={onSignOut} />
              </>
            )}

            {/* Selection mode - home_se */}
            {mode === "home_se" && (
              <>
                {/* Add To Category Button */}
                <button onClick={onOpenAddTo} className="btn btn-primary btn-sm gap-1 font-medieval">
                  <FolderPlus className="size-4" />
                  <span className="hidden sm:inline">Add to</span>
                </button>

                {/* Delete Selected Button */}
                <button
                  onClick={onDeleteSelected}
                  className="btn btn-error btn-sm gap-1 font-medieval"
                >
                  <Trash2 className="size-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>

                {/* Cancel Selection Button */}
                <button
                  onClick={onClearSelection}
                  className="btn btn-ghost btn-sm gap-1 font-medieval border border-base-content/30 hover:border-error hover:text-error"
                >
                  <X className="size-4" />
                  <span className="hidden sm:inline">Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar - hidden in selection mode */}
        {mode === "home" && (
          <div className="mt-3 md:hidden">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/50 group-focus-within:text-primary pointer-events-none transition-colors" />
              <input
                type="text"
                placeholder="Search scrolls..."
                className="input w-full pl-12 pr-4 bg-base-100 border border-base-content/20 focus:border-primary focus:outline-none font-medieval placeholder:text-base-content/40 transition-colors"
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* Mobile Selection Info */}
        {mode === "home_se" && (
          <div className="mt-3 md:hidden text-center">
            <span className="font-medieval text-primary">
              {selectionCount} selected
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
