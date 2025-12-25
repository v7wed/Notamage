import { Link } from "react-router";
import { Check } from "lucide-react";


import { formatDate } from "../lib/utils";


const NoteCard = ({ data, isSelected, onToggleSelect, isSelectionMode, categoryName }) => {

  // Handle checkbox click - prevent navigation and toggle selection
  const handleCheckboxClick = (e) => {
    e.preventDefault(); // Prevent Link navigation
    onToggleSelect(data._id);
  };

  // Handle card click - in selection mode, toggle selection instead of navigating
  const handleCardClick = (e) => {
    if (isSelectionMode) {
      e.preventDefault();
      onToggleSelect(data._id);
    }
    // Otherwise, let the Link navigate normally
  };

  return (
    <div className="parchment-wrapper block group relative">
      {/* Selection Checkbox - shows on hover OR when in selection mode */}
      <div
        className={`
          absolute top-3 right-3 z-10 px-6 py-4
          transition-all duration-200
          ${isSelectionMode || isSelected
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
          }
        `}
      >
        <button
          onClick={handleCheckboxClick}
          className={`
            w-6 h-6 rounded border-2 flex items-center justify-center
            transition-all duration-200 cursor-pointer
            ${isSelected
              ? 'bg-primary border-primary text-primary-content'
              : 'bg-base-100/90 border-base-content/40 hover:border-primary'
            }
          `}
          aria-label={isSelected ? "Deselect note" : "Select note"}
        >
          {isSelected && <Check className="size-4" strokeWidth={3} />}
        </button>
      </div>

      {/* Card Content - wrapped in Link for navigation */}
      <Link
        to={`/note/${data._id}`}
        onClick={handleCardClick}
        className={`
          block parchment-card
          transition-all duration-200
          ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-100' : ''}
        `}
      >
        <div className="parchment-content">
          <h3 className="parchment-title text-lg">{data.title}</h3>
          <p className="parchment-text line-clamp-3">{data.content}</p>

          <div className="flex justify-between items-center mt-4">
            <span className="parchment-date">
              {formatDate(new Date(data.createdAt))}
            </span>
            {categoryName && (
              <span className="text-[10px] font-medieval uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {categoryName}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;

