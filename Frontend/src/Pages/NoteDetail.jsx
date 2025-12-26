import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Save, LoaderIcon } from "lucide-react";
import { toast } from "react-hot-toast";

import api from "../lib/axios";
import DiscardChangesModal from "../Components/DiscardChangesModal";
import "../styles/NoteDetail.css";

const NoteDetail = ({ user }) => {
  const [note, setNote] = useState(null);
  const [originalNote, setOriginalNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [isNewNote, setIsNewNote] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const contentRef = useRef(null);

  // Fetch the note on mount
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        const fetchedNote = response.data;
        setNote(fetchedNote);
        setOriginalNote(fetchedNote);

        // Check if this is a newly created empty note
        if (!fetchedNote.title.trim() && !fetchedNote.content.trim()) {
          setIsNewNote(true);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
        navigate("/home", { replace: true });
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  // Track changes
  useEffect(() => {
    if (note && originalNote) {
      const changed =
        note.title !== originalNote.title ||
        note.content !== originalNote.content;
      setHasChanges(changed);
    }
  }, [note, originalNote]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = contentRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, window.innerHeight - 280)}px`;
    }
  }, [note?.content]);

  // Handle save
  const handleSave = useCallback(async () => {
    if (!note) return false;

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      setOriginalNote({ ...note });
      setHasChanges(false);
      setIsNewNote(false);
      toast.success("Scroll saved successfully");
      return true;
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save scroll");
      return false;
    } finally {
      setSaving(false);
    }
  }, [id, note]);

  // Handle delete (for empty new notes)
  const handleDeleteEmptyNote = async () => {
    try {
      await api.delete(`/notes/${id}`);
    } catch (error) {
      console.error("Error deleting empty note:", error);
    }
  };

  // Check if note should be deleted (empty new note)
  const shouldDeleteNote = () => {
    if (!note) return false;
    return isNewNote && !note.title.trim() && !note.content.trim();
  };

  // Handle back navigation
  const handleBack = () => {
    // If it's a new empty note, delete it and go back
    if (shouldDeleteNote()) {
      handleDeleteEmptyNote();
      navigate("/home");
      return;
    }

    // If there are unsaved changes, show the modal
    if (hasChanges) {
      setShowDiscardModal(true);
      return;
    }

    // No changes, just go back
    navigate("/home");
  };

  // Modal actions
  const handleModalSave = async () => {
    const success = await handleSave();
    if (success) {
      setShowDiscardModal(false);
      navigate("/home");
    }
  };

  const handleModalDiscard = () => {
    // If it was a new note that now has content but user discards, delete it
    if (isNewNote) {
      handleDeleteEmptyNote();
    }
    setShowDiscardModal(false);
    navigate("/home");
  };

  const handleModalCancel = () => {
    setShowDiscardModal(false);
  };

  // Handle input changes
  const handleTitleChange = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setNote({ ...note, content: e.target.value });
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-screen">
        <LoaderIcon className="loading-spinner size-12" />
      </div>
    );
  }

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
            value={note?.title || ""}
            onChange={handleTitleChange}
            autoFocus={isNewNote}
          />

          {/* Content textarea */}
          <textarea
            ref={contentRef}
            className="content-textarea"
            placeholder="Write your thoughts here..."
            value={note?.content || ""}
            onChange={handleContentChange}
          />
        </div>

        {/* Floating save button - only show when there are changes */}
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
      <DiscardChangesModal
        isOpen={showDiscardModal}
        onSave={handleModalSave}
        onDiscard={handleModalDiscard}
        onCancel={handleModalCancel}
        saving={saving}
      />
    </>
  );
};

export default NoteDetail;
