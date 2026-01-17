import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "#1d1c21"
      }}
    >
      {/* Back button */}
      <div className="p-4 md:p-6 relative z-10">
        <Link
          to="/"
          className="btn btn-ghost btn-sm text-gray-400 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="size-4" />
          <span className="font-medieval">Return to Landing</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-20 pb-80 md:pb-96 relative z-10">
        <div className="max-w-3xl">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold font-medieval mb-8 text-white/90">
            About <span className="text-primary">Notamage</span>
          </h1>

          {/* First paragraph */}
          <p className="text-gray-300 font-body text-lg md:text-xl leading-relaxed mb-6">
            This is more than just a notes app — it's my bridge from academic knowledge to production-ready systems.
            Built entirely from scratch, Notamage represents the journey of connecting theoretical understanding with
            real-world application. Through that journey, I've filled a lot of knowledge gaps, learned extensively, and moved
            from single-user thinking to scalable design. Every decision in this project was intentional and independently made.
          </p>

          {/* Second paragraph */}
          <p className="text-gray-400 font-body text-base md:text-lg leading-relaxed mb-8">
            This project filled the gaps between Python notebooks and full-stack applications. It was an interesting journey
            where I started from user flow diagrams and architecture decisions, through design and implementation, all the way
            to deployment — learning so much along the way. This application represents only a portion of that knowledge
            practically applied, as I learned to design with growth in mind.
          </p>

          {/* LinkedIn CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <p className="text-gray-500 font-body text-sm pt-2">
              Want to connect or support my journey?
            </p>
            <a
              href="https://www.linkedin.com/in/v7wed/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline border-primary/50 text-primary hover:bg-primary hover:border-primary hover:text-white gap-2"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-medieval">Find me on LinkedIn</span>
            </a>
          </div>

          {/* Subtle quote */}
          <p className="text-gray-600 font-medieval text-sm mt-12 italic text-center">
            "I have no special talents. I am only passionately curious."
          </p>
        </div>
      </div>

      {/* Background image at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <picture>
          <source media="(max-width: 768px)" srcSet="/aboutimage.png" />
          <img
            src="/aboutimageupdated.png"
            alt="A mysterious forest scene with silhouettes"
            className="w-full object-contain opacity-40"
          />
        </picture>
        {/* Fade overlay on top of image */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #1d1c21 0%, transparent 30%)"
          }}
        />
      </div>
    </div>
  );
};

export default About;
