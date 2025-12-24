import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserPlus, Mail, Lock, User, KeyRound } from "lucide-react";

import api from "../lib/axios.js";

const SignUp = ({ setUser }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    if (formData.Password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post("/users/reg", formData);
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account. Please try again.");
      console.error(`error in handleSubmit in signup page ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="card bg-base-100 shadow-2xl border border-base-content/10">
            <div className="card-body items-center text-center pt-8 pb-10 px-8">
              {/* Mage Animation */}
              <div className="mb-2">
                <div 
                  className="sprite sprite-mage-idle drop-shadow-lg"
                  role="img"
                  aria-label="Animated wizard welcoming new apprentice"
                />
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-primary font-medieval mb-1">
                Join the Guild
              </h1>
              <p className="text-base-content/60 font-body mb-6">
                Begin your magical journey today
              </p>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-error w-full mb-4">
                  <span className="font-body text-sm">{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                {/* Name Field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medieval">Wizard Name</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                    <User className="size-4 text-base-content/50" />
                    <input
                      type="text"
                      name="Name"
                      placeholder="Your mystical name"
                      className="grow font-body"
                      value={formData.Name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </label>
                </div>

                {/* Email Field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medieval">Email Address</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                    <Mail className="size-4 text-base-content/50" />
                    <input
                      type="email"
                      name="Email"
                      placeholder="wizard@realm.com"
                      className="grow font-body"
                      value={formData.Email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                {/* Password Field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medieval">Secret Spell</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                    <Lock className="size-4 text-base-content/50" />
                    <input
                      type="password"
                      name="Password"
                      placeholder="Create your password"
                      className="grow font-body"
                      value={formData.Password}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="label">
                    <span className="label-text-alt text-base-content/50 font-body">
                      At least 6 characters recommended
                    </span>
                  </label>
                </div>

                {/* Confirm Password Field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medieval">Confirm Spell</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                    <KeyRound className="size-4 text-base-content/50" />
                    <input
                      type="password"
                      placeholder="Repeat your password"
                      className="grow font-body"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-primary w-full mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <UserPlus className="size-5" />
                      <span className="font-medieval">Begin Your Journey</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="divider text-base-content/40 text-sm font-body my-6">
                Already a member?
              </div>

              {/* Sign In Link */}
              <p className="font-body text-base-content/70">
                Have an account?{" "}
                <Link 
                  to="/signin" 
                  className="link link-primary font-semibold font-medieval hover:link-hover"
                >
                  Return to Guild
                </Link>
              </p>

              {/* Back to Home */}
              <Link 
                to="/" 
                className="btn btn-ghost btn-sm mt-4 font-medieval text-base-content/60"
              >
                ← Return to Landing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
