import { FolderPlus, LoaderIcon } from "lucide-react";

const CreateCategory = ({ isOpen, onClose, onCreate, newCategoryName, setNewCategoryName, loading }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(e);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-base-200 border border-primary/20 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
                <div className="p-6">
                    <h3 className="text-2xl font-medieval text-primary mb-4 flex items-center gap-2">
                        <FolderPlus className="size-6" />
                        New Category
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                onClick={onClose}
                                className="btn btn-ghost font-medieval"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !newCategoryName.trim()}
                                className="btn btn-primary font-medieval min-w-[100px]"
                            >
                                {loading ? <LoaderIcon className="animate-spin size-4" /> : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
