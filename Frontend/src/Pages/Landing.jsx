import { Link } from "react-router";
import { Sparkles, ScrollText, Wand2 } from "lucide-react";


import NavBar from "../Components/NavBar.jsx";
import Footer from "../Components/Footer.jsx";


const Landing = ({ user, onSignOut }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar user={user} onSignOut={onSignOut} />

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 mt-14">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wand2 className="size-8 md:size-12 text-primary" />
              <h1 className="text-4xl md:text-7xl font-bold text-primary font-medieval">
                Notes Mage
              </h1>
              <Sparkles className="size-8 md:size-12 text-primary" />
            </div>

            <div className="flex justify-center my-6">
              <div
                className="sprite sprite-mage-landing drop-shadow-2xl"
                role="img"
                aria-label="Animated wizard reading a magical scroll"
              />
            </div>

            <p className="text-2xl md:text-3xl text-base-content/80 font-medieval">
              Write Your Thoughts, Organize Your Knowledge
            </p>
          </div>

          <p className="text-lg text-base-content/70 max-w-2xl mx-auto font-body">
            A place where you can create, brainstorm, organize notes, and tasks. With the help of an AI assistant.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {!user && <>
              <Link to="/signup" className="btn btn-primary btn-lg">
                <ScrollText className="size-5" />
                <span className="font-medieval">Give it a try</span>
              </Link>
              <Link to="/signin" className="btn btn-outline btn-lg">
                <span className="font-medieval">Sign In</span>
              </Link></>}
            {user && <Link to="/home" className="btn btn-primary btn-md font-medieval">
              <span>My Notes</span>
            </Link>}
          </div>
        </div>
      </div>

      {/* AI Assistant Features Section */}
      <section className="py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-4 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-primary font-medieval mb-3 md:mb-6">
                Your Personal Companion
              </h2>
              <div className="space-y-2 md:space-y-4 text-base-content/80">
                <p className="font-body text-xs md:text-lg">
                  a wise wizard who lives within your notes, ready to assist at any moment.
                </p>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex gap-2 md:gap-3">
                    <Sparkles className="size-3 md:size-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold font-medieval text-xs md:text-base">Intelligent Conversations</h3>
                      <p className="text-[10px] md:text-sm text-base-content/70 font-body">
                        Discuss your ideas, ask questions about your notes, and get insightful suggestions on how to organize your thoughts better.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 md:gap-3">
                    <Sparkles className="size-3 md:size-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold font-medieval text-xs md:text-base">You provide a knowledge base</h3>
                      <p className="text-[10px] md:text-sm text-base-content/70 font-body">
                        The mage can read your collection, understanding connections between your notes that you might have missed.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 md:gap-3">
                    <Sparkles className="size-3 md:size-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold font-medieval text-xs md:text-base">Always Available</h3>
                      <p className="text-[10px] md:text-sm text-base-content/70 font-body">
                        Floating in the corner of your screen, your wizard companion is always ready to help—just click to summon him.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/chat_icon.png"
                alt="Wizard companion interface"
                className="max-w-full w-full drop-shadow-2xl"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-primary font-medieval mb-6 md:mb-12">
            How the Magic Works
          </h2>
          <div className="grid grid-cols-3 gap-3 md:gap-8">
            <div className="relative">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm md:text-xl font-bold font-medieval mx-auto mb-2 md:mb-4">
                1
              </div>
              <h3 className="text-xs md:text-xl font-semibold font-medieval mb-1 md:mb-3">Create an Account</h3>
              <p className="text-[10px] md:text-sm text-base-content/70 font-body">
                It's quick and easy—you just need a valid email to get started.
              </p>
            </div>
            <div className="relative">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm md:text-xl font-bold font-medieval mx-auto mb-2 md:mb-4">
                2
              </div>
              <h3 className="text-xs md:text-xl font-semibold font-medieval mb-1 md:mb-3">Create Your Notes</h3>
              <p className="text-[10px] md:text-sm text-base-content/70 font-body">
                Write your thoughts and ideas, organize them into categories, and build your personal knowledge base.
              </p>
            </div>
            <div className="relative">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm md:text-xl font-bold font-medieval mx-auto mb-2 md:mb-4">
                3
              </div>
              <h3 className="text-xs md:text-xl font-semibold font-medieval mb-1 md:mb-3">Summon the Wizard</h3>
              <p className="text-[10px] md:text-sm text-base-content/70 font-body">
                Talk with the assistant to ask questions, get suggestions about your notes, generate new notes, or organize and edit your existing ones.
              </p>
            </div>
          </div>
          <div className="mt-12">
            {!user &&
              <Link to="/signup" className="btn btn-primary btn-lg">
                <ScrollText className="size-5" />
                <span className="font-medieval">Give it a try</span>
              </Link>}
          </div>
        </div>
      </section>
      <Footer />
    </div >
  );
};

export default Landing;
