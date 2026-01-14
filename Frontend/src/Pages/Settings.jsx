import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Edit3,
  Lock,
  Mail,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  LoaderIcon
} from "lucide-react";

import api from "../lib/axios.js";
import "../styles/HomePage.css";

const Settings = ({ user }) => {
  const [email, setEmail] = useState(user?.Email || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async () => {
    if (!email.trim() || email === user.Email) {
      setIsEditingEmail(false);
      return;
    }

    setLoading(true);
    try {
      await api.put("/users/email", { Email: email.trim() });
      toast.success("Email updated successfully.");
      setIsEditingEmail(false);
    } catch (error) {
      console.error("Error updating email:", error.response.data.name);
      toast.error(error.response?.data?.message || "Failed to update email");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await api.put("/users/password", {
        oldPassword,
        newPassword
      });
      toast.success("Password updated successfully");
      setShowPassModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-medieval text-primary">Settings</h1>
          <div className="w-24"></div> {/* Spacer for symmetry */}
        </div>

        <div className="grid gap-6">
          {/* Email Setting */}
          <div className="parchment-wrapper">
            <div className="parchment-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Mail className="size-6" />
                </div>
                <div>
                  <h3 className="font-medieval text-xl text-ink-brown">Email Address</h3>
                  <p className="text-sm text-ink-faded font-body">Your registered email</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-base-100/50 p-4 rounded-lg border border-primary/10">
                {isEditingEmail ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-sm w-full bg-base-100 border-primary/30 focus:border-primary font-body"
                      autoFocus
                    />
                    <button
                      onClick={handleUpdateEmail}
                      disabled={loading}
                      className="btn btn-primary btn-sm btn-square"
                    >
                      {loading ? <LoaderIcon className="size-4 animate-spin" /> : <Check className="size-4" />}
                    </button>
                    <button
                      onClick={() => setIsEditingEmail(false)}
                      className="btn btn-ghost btn-sm btn-square"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-body text-lg text-ink-brown">{user?.Email}</span>
                    <button
                      onClick={() => setIsEditingEmail(true)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                      title="Edit Email"
                    >
                      <Edit3 className="size-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Password Setting */}
          <div className="parchment-wrapper">
            <div className="parchment-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Lock className="size-6" />
                </div>
                <div>
                  <h3 className="font-medieval text-xl text-ink-brown">Password</h3>
                  <p className="text-sm text-ink-faded font-body">Protect your precious notes</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-base-100/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-3">
                  <span className="font-body text-xl tracking-widest text-ink-brown">
                    ••••••••••••
                  </span>
                </div>
                <button
                  onClick={() => setShowPassModal(true)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                  title="Update Password"
                >
                  <Edit3 className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Password Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPassModal(false)}
          />

          <div className="relative bg-base-200 border border-primary/20 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            <div className="p-6">
              <h3 className="text-2xl font-medieval text-primary mb-4 flex items-center gap-2">
                <ShieldCheck className="size-6" />
                Update Password
              </h3>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medieval">Current Password</span>
                  </label>
                  <input
                    type="password"
                    className="input w-full bg-base-100 border border-primary/20 focus:border-primary font-body"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    placeholder="Verify your old password"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medieval">New Password</span>
                  </label>
                  <input
                    type="password"
                    className="input w-full bg-base-100 border border-primary/20 focus:border-primary font-body"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="At least 6 characters"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medieval">Confirm New Password</span>
                  </label>
                  <input
                    type="password"
                    className="input w-full bg-base-100 border border-primary/20 focus:border-primary font-body"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your new password"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPassModal(false);
                      setOldPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="btn btn-ghost font-medieval"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !oldPassword || !newPassword || !confirmPassword}
                    className="btn btn-primary font-medieval min-w-[100px]"
                  >
                    {loading ? <LoaderIcon className="animate-spin size-4" /> : "Save Changes"}
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

export default Settings;
