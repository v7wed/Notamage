import { Link } from "react-router";
import { BookOpen, Scroll, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-300 border-t border-base-content/10 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Scroll className="size-6 text-primary" />
              <h3 className="text-xl font-bold text-primary" style={{ fontFamily: 'serif' }}>
                Notes Mage
              </h3>
            </div>
            <p className="text-sm text-base-content/70" style={{ fontFamily: 'serif' }}>
              Your mystical companion for organizing thoughts and weaving knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-base-content flex items-center gap-2" style={{ fontFamily: 'serif' }}>
              <BookOpen className="size-4" />
              Explore
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-base-content/70 hover:text-primary transition-colors" style={{ fontFamily: 'serif' }}>
                About the Mage
              </Link>
              <Link to="/signin" className="text-sm text-base-content/70 hover:text-primary transition-colors" style={{ fontFamily: 'serif' }}>
                Sign In
              </Link>
              <Link to="/signup" className="text-sm text-base-content/70 hover:text-primary transition-colors" style={{ fontFamily: 'serif' }}>
                Join the Guild
              </Link>
            </nav>
          </div>

          {/* Mystical Quote */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-base-content flex items-center gap-2" style={{ fontFamily: 'serif' }}>
              <Sparkles className="size-4" />
              Wisdom
            </h4>
            <p className="text-sm italic text-base-content/70" style={{ fontFamily: 'serif' }}>
              "Knowledge is the true magic that transforms the ordinary into the extraordinary."
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-content/10 mt-8 pt-6 text-center">
          <p className="text-xs text-base-content/50" style={{ fontFamily: 'serif' }}>
            © {new Date().getFullYear()} Notes Mage. A portfolio project crafted with magic and code.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
