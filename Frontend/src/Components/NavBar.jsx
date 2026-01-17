import { Link } from "react-router";
import { Search, Feather, Filter, Trash2, X, FolderPlus, Clock } from "lucide-react";


import Logo from "./Logo.jsx";
import UserProfileDropdown from "./UserProfileDropdown.jsx";

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
  setCatMode,
  handleCreateNote
}) => {
  const handleChange = (e) => setSearch(e.target.value);
  const selectionCount = selectedNotes.length;



  return (
    <header className="bg-base-300/30 backdrop-blur-md border-b border-base-content/10 sticky top-0 z-50">

      {/* Logo  */}
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Logo textSize="text-xl sm:text-3xl" iconSize="size-6 sm:size-8" />

          {/* Desktop Search */}
          {mode === "home" && (
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <label className="input input-md flex items-center gap-3 bg-base-100 border border-base-content/20 focus-within:border-primary font-medieval group transition-colors">
                <Search className="size-5 text-base-content/50 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search your notes..."
                  className="grow"
                  onChange={handleChange}
                />
              </label>
            </div>
          )}

          {/* Selection Count */}
          {mode === "home_se" && (
            <div className="flex-1 flex justify-center">
              <span className="font-medieval text-primary text-lg">
                {selectionCount} {selectionCount === 1 ? 'scroll' : 'scrolls'} selected
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Landing page no user */}
            {mode === "landing" && !user && (
              <>
                <Link to="/about" className="text-sm font-medieval text-base-content/70 hover:text-primary transition-colors hidden sm:block">
                  About
                </Link>
                <Link to="/signin" className="btn btn-ghost btn-sm font-medieval">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm font-medieval">
                  <span className="hidden sm:inline">Give it a try</span>
                  <span className="sm:hidden">Join</span>
                </Link>
              </>
            )}

            {/* Landing page user */}
            {mode === "landing" && user && (
              <>
                <Link to="/home" className="btn btn-primary btn-sm font-medieval">
                  My Notes
                </Link>
                <UserProfileDropdown onSignOut={onSignOut} />
              </>
            )}

            {/* Home page */}
            {mode === "home" && (
              <>
                <button
                  onClick={handleCreateNote}
                  className="btn btn-primary btn-sm gap-1 font-medieval"
                >
                  <Feather className="size-4" />
                  <span className="hidden sm:inline">Create</span>
                </button>

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


            {/* Selection mode */}
            {mode === "home_se" && (
              <>
                <button onClick={onOpenAddTo} className="btn btn-primary btn-sm gap-1 font-medieval">
                  <FolderPlus className="size-4" />
                  <span className="hidden sm:inline">Add to</span>
                </button>

                <button
                  onClick={onDeleteSelected}
                  className="btn btn-error btn-sm gap-1 font-medieval"
                >
                  <Trash2 className="size-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>

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

        {/* Mobile Search Bar  */}
        {mode === "home" && (
          <div className="mt-3 md:hidden">
            <label className="input input-sm flex items-center gap-2 bg-base-100 border border-base-content/20 focus-within:border-primary font-medieval group transition-colors">
              <Search className="size-4 text-base-content/50 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search scrolls..."
                className="grow"
                onChange={handleChange}
              />
            </label>
          </div>
        )}

        {/* Mobile Selection Count */}
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
