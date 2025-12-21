import { Link } from "react-router";

import Logo from "./Logo.jsx";
import UserProfileDropdown from "./UserProfileDropdown.jsx";


const VARIANTS = {
  text: "text-sm font-medieval text-base-content/70 hover:text-primary transition-colors",
  ghost: "btn btn-ghost btn-sm font-medieval",
  primary: "btn btn-primary btn-sm font-medieval",
};

const Navbar = ({ mode = "landing", user, onSignOut }) => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-4">
            {mode === "landing" && !user && (
              <>
                <Link to="/about" className={VARIANTS.text}>
                  About
                </Link>
                <Link to="/signin" className={VARIANTS.ghost}>
                  <span>Sign In</span>
                </Link>
                <Link to="/signup" className={VARIANTS.primary}>
                  <span>Join the Mage</span>
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
                {/* TODO: Search bar, Create button, Filter button, Profile */}
              </>
            )}


            {mode === "home_se" && (
              <>
                {/* TODO: Disabled search bar, Add to button, Delete button */}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
