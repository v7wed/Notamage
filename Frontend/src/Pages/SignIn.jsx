import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LogIn, Mail, Lock } from "lucide-react";

import api from "../lib/axios.js";

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/users/signin", {
        Email: email,
        Password: password,
      });
      localStorage.setItem("token", response.data.token);
      // Transform to match the structure from /users/me (uses _id, not id)
      setUser({
        _id: response.data.id,
        Name: response.data.Name,
        Email: response.data.Email,
      });

      // Small delay to ensure React state update propagates before navigation

      navigate("/home");

    } catch (err) {
      setError(err.response?.data?.message || "Failed to sign in. Please try again.");
      console.error(`error in handleSubmit in signin page ${err}`);
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
                  aria-label="Animated wizard welcoming you"
                />
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-primary font-medieval mb-1">
                Welcome Back
              </h1>
              <p className="text-base-content/60 font-body mb-6">
                I was awaiting your return
              </p>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-error w-full mb-4">
                  <span className="font-body text-sm">{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                {/* Email Field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medieval">Email Address</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                    <Mail className="size-4 text-base-content/50" />
                    <input
                      type="email"
                      placeholder="wizard@realm.com"
                      className="grow font-body"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                {/* Password Field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medieval">Password</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 focus-within:outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                    <Lock className="size-4 text-base-content/50" />
                    <input
                      type="password"
                      placeholder="Your secret spell"
                      className="grow font-body"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full mt-6"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <LogIn className="size-5" />
                      <span className="font-medieval">Enter the Guild</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="divider text-base-content/40 text-sm font-body my-6">
                New to the realm?
              </div>

              {/* Sign Up Link */}
              <p className="font-body text-base-content/70">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="link link-primary font-semibold font-medieval hover:link-hover"
                >
                  Begin Your Journey
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

export default SignIn;
