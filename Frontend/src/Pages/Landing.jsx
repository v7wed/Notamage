import { Link } from "react-router";
import { Sparkles, ScrollText, Wand2 } from "lucide-react";


import NavBar from "../Components/NavBar.jsx";
import Footer from "../Components/Footer.jsx";

const Landing = ({user, onSignOut}) => {
  console.log("Landing page user prop:", user);
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar user={user} onSignOut={onSignOut} />
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 mt-14">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wand2 className="size-8 md:size-12 text-primary" />
              <h1 className="text-4xl md:text-7xl font-bold text-primary font-medieval">
                Notes Mage
              </h1>
              <Sparkles className="size-8 md:size-12 text-primary" />
            </div>

            {/* Mage Animation */}
            <div className="flex justify-center my-6">
              <div 
                className="sprite sprite-mage-landing drop-shadow-2xl"
                role="img"
                aria-label="Animated wizard reading a magical scroll"
              />
            </div>

            <p className="text-2xl md:text-3xl text-base-content/80 font-medieval">
              Summon Your Thoughts, Master Your Knowledge
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto font-body">
            A mystical companion that helps you organize, create, and manage your notes with the wisdom of an ancient wizard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/signup" className="btn btn-primary btn-lg">
              <ScrollText className="size-5" />
              <span className="font-medieval">Begin Your Journey</span>
            </Link>
            <Link to="/signin" className="btn btn-outline btn-lg">
              <span className="font-medieval">Return to Guild</span>
            </Link>
          </div>
        </div>
      </div>

      {/* AI Companion Section */}
      <section className="py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary font-medieval mb-6">
                Your Personal Wizard Companion
              </h2>
              <div className="space-y-4 text-base-content/80">
                <p className="font-body text-lg">
                  Meet your mystical guide—a wise wizard who lives within your notes, ready to assist at any moment.
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Sparkles className="size-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold font-medieval">Intelligent Conversations</h3>
                      <p className="text-sm text-base-content/70 font-body">
                        Discuss your ideas, ask questions about your notes, and get insightful suggestions on how to organize your thoughts better.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Sparkles className="size-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold font-medieval">Contextual Understanding</h3>
                      <p className="text-sm text-base-content/70 font-body">
                        The mage reads your entire collection, understanding connections between your notes that you might have missed.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Sparkles className="size-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold font-medieval">Always Available</h3>
                      <p className="text-sm text-base-content/70 font-body">
                        Floating in the corner of your screen, your wizard companion is always ready to help—just click to summon him.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/mage_chat_landing.png"
                alt="Wizard companion interface"
                className="max-w-sm w-full drop-shadow-2xl"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Smart Organization */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary font-medieval mb-4">
              Effortless Organization
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto font-body">
              Let ancient wisdom guide your note-taking. The mage helps you structure, categorize, and retrieve your knowledge with magical efficiency.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-base-200 rounded-lg border border-base-content/10">
              <ScrollText className="size-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold font-medieval mb-3">Auto-Categorization</h3>
              <p className="text-sm text-base-content/70 font-body">
                The wizard analyzes your notes and suggests relevant categories, tags, and connections automatically.
              </p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg border border-base-content/10">
              <Wand2 className="size-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold font-medieval mb-3">Smart Search</h3>
              <p className="text-sm text-base-content/70 font-body">
                Ask the mage to find notes by topic, date, or even vague descriptions—he understands context, not just keywords.
              </p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg border border-base-content/10">
              <Sparkles className="size-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold font-medieval mb-3">Link Discovery</h3>
              <p className="text-sm text-base-content/70 font-body">
                Discover hidden connections between your notes. The mage reveals patterns and relationships you never noticed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creation & Productivity */}
      <section className="py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary font-medieval mb-4">
              Create with Confidence
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto font-body">
              Writer's block? The mage is your creative partner, helping you brainstorm, expand, and refine your ideas.
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Wand2 className="size-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold font-medieval mb-2">Idea Expansion</h3>
                <p className="text-base-content/70 font-body">
                  Share a rough thought with the mage, and he'll help you develop it into a full-fledged note with structured sections, relevant examples, and additional angles to consider.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <ScrollText className="size-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold font-medieval mb-2">Quick Summaries</h3>
                <p className="text-base-content/70 font-body">
                  Got lengthy notes? Ask the wizard to distill them into concise summaries or key takeaways, perfect for quick reviews.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Sparkles className="size-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold font-medieval mb-2">Template Suggestions</h3>
                <p className="text-base-content/70 font-body">
                  Starting a new project? The mage suggests proven note templates and structures based on what you're working on—whether it's a study guide, project plan, or creative writing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary font-medieval mb-12">
            How the Magic Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold font-medieval mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold font-medieval mb-3">Create Your Scrolls</h3>
              <p className="text-sm text-base-content/70 font-body">
                Write notes naturally—the mage observes and learns your style, topics, and patterns.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold font-medieval mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold font-medieval mb-3">Summon the Wizard</h3>
              <p className="text-sm text-base-content/70 font-body">
                Click the floating mage to ask questions, get suggestions, or request help organizing.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold font-medieval mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold font-medieval mb-3">Master Your Knowledge</h3>
              <p className="text-sm text-base-content/70 font-body">
                Let the wizard handle organization while you focus on creating and learning.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Link to="/signup" className="btn btn-primary btn-lg">
              <ScrollText className="size-5" />
              <span className="font-medieval">Start Your Quest</span>
            </Link>
          </div>
        </div>
      </section>
<Footer />
    </div>
  );
};

export default Landing;
