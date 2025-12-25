import { Link } from "react-router";
import { Search, Feather, Filter } from "lucide-react";

import Logo from "./Logo.jsx";
import UserProfileDropdown from "./UserProfileDropdown.jsx";


const VARIANTS = {
  text: "text-sm font-medieval text-base-content/70 hover:text-primary transition-colors",
  ghost: "btn btn-ghost btn-sm font-medieval",
  primary: "btn btn-primary btn-sm font-medieval",
};

const Navbar = ({ setSearch,mode = "landing", user=null, onSignOut }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  }
  return (
    <header className="bg-base-300/30 backdrop-blur-md border-b border-base-content/10 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Logo textSize="text-xl sm:text-3xl" iconSize="size-6 sm:size-8" />

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

          <div className="flex items-center gap-2 sm:gap-3">
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

            {mode === "landing" && user && (
              <>
                <Link to="/home" className={VARIANTS.primary}>
                  <span>My Notes</span>
                </Link>
                <UserProfileDropdown onSignOut={onSignOut} />
              </>
            )}

            {mode === "home" && (
              <>
                <Link to="/create" className="btn btn-primary btn-sm gap-1 font-medieval">
                  <Feather className="size-4" />
                  <span className="hidden sm:inline">Create</span>
                </Link>
                <button className="btn btn-ghost btn-sm gap-1 font-medieval border border-primary/30 hover:border-primary">
                  <Filter className="size-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                <UserProfileDropdown onSignOut={onSignOut} />
              </>
            )}


            {mode === "home_se" && (
              <>
                {/* TODO: Disabled search bar, Add to button, Delete button */}
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
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
      </div>
    </header>
  );
};

export default Navbar;
