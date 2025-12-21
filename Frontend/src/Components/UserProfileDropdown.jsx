import { Link } from "react-router";
import { User } from "lucide-react";

const UserProfileDropdown = ({ onSignOut }) => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
        <User className="size-5" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-content/10 mt-3">
        <li><Link to="/settings" className="font-medieval">Settings</Link></li>
        <li><Link to="/categories" className="font-medieval">My Categories</Link></li>
        <li className="border-t border-base-content/10 mt-1 pt-1">
          <button onClick={onSignOut} className="font-medieval text-error">
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileDropdown;
