import { Link } from "react-router";
import { Sparkles, ScrollText, Wand2 } from "lucide-react";

import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar.jsx";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Footer */}
      <NavBar />
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wand2 className="size-12 text-primary" />
              <h1 className="text-6xl md:text-7xl font-bold text-primary" style={{ fontFamily: 'serif', letterSpacing: '0.05em' }}>
                Notes Mage
              </h1>
              <Sparkles className="size-12 text-primary" />
            </div>
            <p className="text-2xl md:text-3xl text-base-content/80" style={{ fontFamily: 'serif' }}>
              Summon Your Thoughts, Master Your Knowledge
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto" style={{ fontFamily: 'serif' }}>
            A mystical companion that helps you organize, create, and manage your notes with the wisdom of an ancient wizard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/signup" className="btn btn-primary btn-lg">
              <ScrollText className="size-5" />
              <span style={{ fontFamily: 'serif' }}>Begin Your Journey</span>
            </Link>
            <Link to="/signin" className="btn btn-outline btn-lg">
              <span style={{ fontFamily: 'serif' }}>Return to Guild</span>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <Wand2 className="size-10 text-primary mb-2" />
                <h3 className="card-title" style={{ fontFamily: 'serif' }}>AI-Powered Assistant</h3>
                <p className="text-sm text-base-content/70" style={{ fontFamily: 'serif' }}>
                  Your personal wizard helps organize and manage your scrolls
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <ScrollText className="size-10 text-primary mb-2" />
                <h3 className="card-title" style={{ fontFamily: 'serif' }}>Mystical Notes</h3>
                <p className="text-sm text-base-content/70" style={{ fontFamily: 'serif' }}>
                  Create and categorize your thoughts like ancient manuscripts
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <Sparkles className="size-10 text-primary mb-2" />
                <h3 className="card-title" style={{ fontFamily: 'serif' }}>Knowledge Mastery</h3>
                <p className="text-sm text-base-content/70" style={{ fontFamily: 'serif' }}>
                  Harness the power of organized wisdom and insight
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
