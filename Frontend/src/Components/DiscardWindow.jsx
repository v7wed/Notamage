import { AlertTriangle, Save, X, ArrowLeft } from "lucide-react";
const DiscardWindow = ({ isOpen, onSave, onDiscard, onCancel, saving }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="relative bg-[#f5edd8] border-2 border-[#c9b896] rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                {/* Decorative top border */}
                <div className="h-1.5 bg-gradient-to-r from-[#d9c5a0] via-[#e8d9b5] to-[#d9c5a0]" />

                <div className="p-6">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-amber-100 border-2 border-amber-300">
                            <AlertTriangle className="size-8 text-amber-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-medieval text-center text-[#3d3019] mb-3">
                        Unsaved Changes
                    </h3>

                    {/* Message */}
                    <p className="text-center text-[#5c4a2a] font-medieval text-base mb-6 leading-relaxed">
                        You have unsaved changes to your scroll. What would you like to do?
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        {/* Save Button - lighter color matching the floating save button */}
                        <button
                            onClick={onSave}
                            disabled={saving}
                            className="btn w-full py-3 bg-[#d9c5a0] hover:bg-[#e3d2ae] border-2 border-[#c9b896] text-[#5c4a2a] font-medieval text-base font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
                        >
                            <Save className="size-5" />
                            <span>{saving ? "Saving..." : "Save Changes"}</span>
                        </button>

                        {/* Discard Button */}
                        <button
                            onClick={onDiscard}
                            className="btn w-full py-3 bg-red-50 hover:bg-red-100 border-2 border-red-300 text-red-700 font-medieval text-base rounded-lg flex items-center justify-center gap-2 transition-all"
                        >
                            <X className="size-5" />
                            <span>Discard Changes</span>
                        </button>

                        {/* Cancel Button */}
                        <button
                            onClick={onCancel}
                            className="btn w-full py-3 bg-[#e8dab7] hover:bg-[#dfd0a8] border-2 border-[#c9b896] text-[#5c4a2a] font-medieval text-base rounded-lg flex items-center justify-center gap-2 transition-all"
                        >
                            <ArrowLeft className="size-5" />
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DiscardWindow;