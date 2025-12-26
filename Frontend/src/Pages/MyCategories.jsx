import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Trash2,
  Edit3,
  Plus,
  X,
  FolderPlus,
  Check,
  AlertTriangle,
  LoaderIcon
} from "lucide-react";

import api from "../lib/axios.js";
import "../styles/HomePage.css"; // Reuse parchment styles

const MyCategories = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    if (!user?._id) return;
    try {
      const resp = await api.get(`/categ/for/${user._id}`);
      setCategories(resp.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [user?._id]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setActionLoading(true);
    try {
      await api.post("/categ", {
        name: newCategoryName.trim(),
        userID: user._id
      });
      toast.success("New category created successfully");
      setNewCategoryName("");
      setShowAddModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateCategory = async (id) => {
    if (!editName.trim()) {
      setEditingId(null);
      return;
    }

    try {
      await api.put(`/categ/${id}`, { name: editName.trim() });
      toast.success("Category renamed successfully");
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (cat) => {
    const confirmMsg = `Are you sure you want to delete "${cat.name}"? This will uncategorize all notes in it.`;
    if (!window.confirm(confirmMsg)) return;

    setActionLoading(true);
    try {
      // Step 1: Clear notes from category
      await api.put(`/categ/${cat._id}/clear`);

      // Step 2: Delete the category
      await api.delete(`/categ/${cat._id}`);

      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    } finally {
      setActionLoading(false);
    }
  };

  const startEditing = (cat) => {
    setEditingId(cat._id);
    setEditName(cat.name);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/home" className="btn btn-ghost btn-sm gap-2 font-medieval border border-primary/30 hover:border-primary">
            <ArrowLeft className="size-4" />
            <span>Return to Notes</span>
          </Link>
          <h1 className="text-3xl font-medieval text-primary">My Categories</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary btn-sm gap-2 font-medieval"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add Category</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoaderIcon className="size-10 animate-spin text-primary" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 parchment-wrapper">
            <div className="parchment-card p-10">
              <FolderPlus className="size-16 mx-auto mb-4 text-primary/40" />
              <p className="font-medieval text-xl text-base-content/60">No mystical categories found.</p>
              <p className="font-medieval text-sm text-base-content/40 mt-2">Create one to organize your scrolls.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {categories.map((cat) => (
              <div key={cat._id} className="parchment-wrapper">
                <div className="parchment-card flex items-center justify-between py-4 px-6">
                  {editingId === cat._id ? (
                    <div className="flex-1 flex gap-2 items-center mr-4">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdateCategory(cat._id)}
                        className="input input-sm w-full bg-base-100/50 border-primary/30 focus:border-primary font-medieval"
                      />
                      <button
                        onClick={() => handleUpdateCategory(cat._id)}
                        className="btn btn-primary btn-xs btn-square"
                      >
                        <Check className="size-3" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-ghost btn-xs btn-square"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ) : (
                    <span className="font-medieval text-xl text-ink-brown">{cat.name}</span>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditing(cat)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                      title="Edit Name"
                    >
                      <Edit3 className="size-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      className="p-2 text-error hover:bg-error/10 rounded-full transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-base-200 border border-primary/20 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            <div className="p-6">
              <h3 className="text-2xl font-medieval text-primary mb-4 flex items-center gap-2">
                <FolderPlus className="size-6" />
                New Category
              </h3>

              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medieval">Category Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Forbidden Magic"
                    className="input w-full bg-base-100 border border-primary/20 focus:border-primary font-medieval"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-ghost font-medieval"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading || !newCategoryName.trim()}
                    className="btn btn-primary font-medieval min-w-[100px]"
                  >
                    {actionLoading ? <LoaderIcon className="animate-spin size-4" /> : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCategories;
