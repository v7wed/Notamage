import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Save, LoaderIcon } from "lucide-react";
import { toast } from "react-hot-toast";

import api from "../lib/axios";
import DiscardWindow from "../Components/DiscardWindow.jsx";
import "../styles/NoteDetail.css";
import Loading from "../Components/Loading.jsx";

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [originalNote, setOriginalNote] = useState(null);

  const isNewNote = useRef(false);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDiscardWindow, setShowDiscardWindow] = useState(false);


  const navigate = useNavigate();
  const { id } = useParams();
  const contentRef = useRef(null);

  // Fetch note on mount
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        const fetchedNote = response.data;
        setOriginalNote(fetchedNote);
        setNote(fetchedNote);

        if (!fetchedNote.title.trim() && !fetchedNote.content.trim()) {
          isNewNote.current = true;
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
        navigate("/home");
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Track changes (for save button visiblity)
  useEffect(() => {
    if (note && originalNote) {
      const changed =
        note.title !== originalNote.title ||
        note.content !== originalNote.content;
      setHasChanges(changed);
    }
  }, [note, originalNote]);

  // Track note content (for text area auto resize)
  useEffect(() => {
    const textarea = contentRef.current;
    if (textarea) {
      const scrollPos = window.scrollY;

      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, window.innerHeight - 280)}px`;

      window.scrollTo(0, scrollPos);
    }
  }, [note?.content]);


  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      setOriginalNote({ ...note });
      setHasChanges(false);
      isNewNote.current = false;
      toast.success("Note saved successfully");
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  }

  // Handle delete (for empty new notes)
  const handleDeleteEmptyNote = async () => {
    try {
      await api.delete(`/notes/${id}`);
    } catch (error) {
      console.error("Error deleting empty note:", error);
    }
  };

  const shouldDeleteNote = () => {
    return isNewNote.current && !note.title.trim() && !note.content.trim();
    // it's a new note + the user didn't write anything on it (=delete it from backend)
  };


  const handleBack = () => {
    if (shouldDeleteNote()) {
      handleDeleteEmptyNote();
      navigate("/home");
      return;
    }


    if (hasChanges) {
      setShowDiscardWindow(true);
      return;
    } else {
      navigate("/home");
    }
  };

  // Modal actions
  const handleSaveWindow = async () => {
    const success = await handleSave();
    if (success) {
      setShowDiscardWindow(false);
      navigate("/home");
    }
  };

  const handleDiscardChanges = () => {
    if (isNewNote.current) {
      handleDeleteEmptyNote();
    }
    setShowDiscardWindow(false);
    navigate("/home");
  };


  // Handle input changes
  const handleTitleChange = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setNote({ ...note, content: e.target.value });
  };

  // Loading state
  if (loading) return <Loading />


  return (
    <>
      <div className="ancient-paper">
        {/* Paper decorations */}
        <div className="paper-lines" />
        <div className="margin-line" />

        {/* Stain effects */}
        <div className="paper-stain stain-1" />
        <div className="paper-stain stain-2" />
        <div className="paper-stain stain-3" />

        {/* Ink splatters */}
        <div className="ink-splatter splatter-1" />
        <div className="ink-splatter splatter-2" />

        {/* Main content */}
        <div className="paper-content">
          {/* Back button */}
          <button onClick={handleBack} className="back-button" title="Return to Notes">
            <ArrowLeft className="size-5" />
          </button>

          {/* Title input */}
          <input
            type="text"
            className="title-input"
            placeholder="Title"
            value={note.title}
            onChange={handleTitleChange}
            autoFocus={isNewNote.current}
          />

          {/* Content textarea */}
          <textarea
            ref={contentRef}
            className="content-textarea"
            placeholder="Write your thoughts here..."
            value={note.content}
            onChange={handleContentChange}
          />
        </div>

        {/* Save button */}
        {hasChanges && (
          <button
            className="floating-save"
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="size-5" />
            <span>{saving ? "Saving..." : "Save"}</span>
          </button>
        )}
      </div>

      {/* Discard Changes Modal */}
      <DiscardWindow
        isOpen={showDiscardWindow}
        onSave={handleSaveWindow}
        onDiscard={handleDiscardChanges}
        onCancel={() => setShowDiscardWindow(false)}
        saving={saving}
      />
    </>
  );
};

export default NoteDetail;
