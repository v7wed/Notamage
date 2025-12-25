import { Link } from "react-router";
import { formatDate } from "../lib/utils";

const NoteCard = ({ data }) => {
  return (
    <Link to={`/note/${data._id}`} className="parchment-wrapper block">
      <div className="parchment-card">
        {/* Main content */}
        <div className="parchment-content">
          <h3 className="parchment-title text-lg">{data.title}</h3>
          <p className="parchment-text line-clamp-3">{data.content}</p>

          {/* Date display */}
          <div className="flex justify-between items-center mt-4">
            <span className="parchment-date">
              {formatDate(new Date(data.createdAt))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
