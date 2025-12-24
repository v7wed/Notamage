import { Link } from "react-router";
import { Home } from "lucide-react";

import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Notfound = ({ user, SignOut }) => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar user={user} onSignOut={SignOut} />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* 404 Image */}
        <img
          src="/404notfoundz.png"
          alt="Page not found"
          className="w-64 md:w-80 lg:w-96 mb-8 drop-shadow-lg"
        />

        {/* Title */}
        <h1 className="font-medieval text-4xl md:text-5xl lg:text-6xl text-primary mb-4 text-center">
          Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="font-body text-base-content/70 text-lg md:text-xl mb-8 text-center max-w-md">
          The note you seek belongs to the unknown realm...
        </p>

        {/* Back Home Button */}
        <Link to="/" className="btn btn-primary gap-2">
          <Home className="w-5 h-5" />
          Back Home
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default Notfound;
