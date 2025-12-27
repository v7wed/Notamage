import { NotebookIcon, SearchX } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = ({ search = "", onCreateFirstNote }) => {

  if (search.trim()) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-primary/10 rounded-full p-8 border border-primary/20">
          <SearchX className="size-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-medieval font-bold text-primary">No Scrolls Found</h3>
          <p className="text-base-content/70 font-body">
            Our mages found no mystical scrolls matching <span className="text-primary italic font-bold">"{search}"</span> in your archives.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold font-medieval text-primary">Your Archives are Empty</h3>
        <p className="text-base-content/70 font-body">
          Ready to organize your thoughts? Manifest your first scroll to begin your journey.
        </p>
      </div>
      <button onClick={onCreateFirstNote} className="btn btn-primary font-medieval shadow-lg px-8">
        Manifest First Note
      </button>
    </div>
  );
};

export default NotesNotFound;
