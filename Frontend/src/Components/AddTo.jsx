import { useState } from "react";
import { toast } from "react-hot-toast";
import { X, FolderPlus, Check, Minus } from "lucide-react";

import api from "../lib/axios.js";

const AddToModal = ({
    isOpen,
    onClose,
    selectedNotes,
    categories,
    userId,
    onSuccess
}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSelectCategory = (catId) => {
        // Toggle selection - if already selected, deselect it
        setSelectedCategory(prev => prev === catId ? null : catId);
        setIsCreatingNew(false);
    };

    const handleSelectNone = () => {
        setSelectedCategory("none");
        setIsCreatingNew(false);
    };

    const handleCreateNew = () => {
        setIsCreatingNew(true);
        setSelectedCategory(null);
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            let categoryIdToUse = null;

            // If creating a new category first
            if (isCreatingNew && newCategoryName.trim()) {
                const createRes = await api.post("/categ", {
                    name: newCategoryName.trim(),
                    userID: userId
                });
                // Get the newly created category ID from response
                // We need to fetch categories again to get the ID
                const categRes = await api.get(`/categ/for/${userId}`);
                const newCat = categRes.data.find(c => c.name === newCategoryName.trim());
                if (newCat) {
                    categoryIdToUse = newCat._id;
                }
            } else if (selectedCategory && selectedCategory !== "none") {
                categoryIdToUse = selectedCategory;
            }
            // If "none" is selected, categoryIdToUse stays null (uncategorize)

            // Now update the notes
            await api.put("/categ/add", {
                notesID: selectedNotes,
                categoryID: categoryIdToUse
            });

            toast.success(
                categoryIdToUse
                    ? `Added ${selectedNotes.length} scrolls to category`
                    : `Uncategorized ${selectedNotes.length} scrolls`
            );

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error updating categories:", error);
            toast.error("Failed to update categories");
        } finally {
            setLoading(false);
        }
    };

    const canSubmit = selectedCategory || (isCreatingNew && newCategoryName.trim());

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-base-200 border border-primary/20 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-base-content/10">
                    <h3 className="text-xl font-medieval text-primary flex items-center gap-2">
                        <FolderPlus className="size-5" />
                        Add to Category
                    </h3>
                    <button
                        onClick={onClose}
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                    {/* None Option */}
                    <button
                        onClick={handleSelectNone}
                        className={`
              w-full p-3 rounded-lg border-2 text-left font-medieval
              flex items-center justify-between transition-all
              ${selectedCategory === "none"
                                ? "border-warning bg-warning/10 text-warning"
                                : "border-base-content/20 hover:border-warning/50"
                            }
            `}
                    >
                        <span className="flex items-center gap-2">
                            <Minus className="size-4" />
                            None (Uncategorize)
                        </span>
                        {selectedCategory === "none" && <Check className="size-5" />}
                    </button>

                    {/* Existing Categories */}
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => handleSelectCategory(cat._id)}
                            className={`
                w-full p-3 rounded-lg border-2 text-left font-medieval
                flex items-center justify-between transition-all
                ${selectedCategory === cat._id
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-base-content/20 hover:border-primary/50"
                                }
              `}
                        >
                            <span>{cat.name}</span>
                            {selectedCategory === cat._id && <Check className="size-5" />}
                        </button>
                    ))}

                    {/* Create New Option */}
                    <button
                        onClick={handleCreateNew}
                        className={`
              w-full p-3 rounded-lg border-2 border-dashed text-left font-medieval
              flex items-center gap-2 transition-all
              ${isCreatingNew
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-base-content/30 hover:border-primary/50 text-base-content/60"
                            }
            `}
                    >
                        <FolderPlus className="size-4" />
                        Create New Category
                    </button>

                    {/* New Category Input */}
                    {isCreatingNew && (
                        <input
                            type="text"
                            placeholder="Enter category name..."
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            autoFocus
                            className="input w-full font-medieval border-2 border-primary/30 focus:border-primary focus:outline-none bg-base-100"
                        />
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t border-base-content/10 bg-base-300/50">
                    <span className="text-sm font-medieval text-base-content/60">
                        {selectedNotes.length} {selectedNotes.length === 1 ? "scroll" : "scrolls"} selected
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="btn btn-ghost btn-sm font-medieval"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!canSubmit || loading}
                            className="btn btn-primary btn-sm font-medieval"
                        >
                            {loading ? "Saving..." : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToModal;
