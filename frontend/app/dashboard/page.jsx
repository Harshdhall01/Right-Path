"use client";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { BookMarked, Brain, BarChart2, MessageCircle, Zap, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { icon: <Zap size={18} />,          label: "Predictor",  href: "/predict",  color: "from-gBlue to-gCyan"   },
  { icon: <MessageCircle size={18} />, label: "AI Chat",    href: "/chat",     color: "from-gPurple to-gBlue" },
  { icon: <BarChart2 size={18} />,     label: "ROI Tool",   href: "/roi",      color: "from-gMint to-gBlue"   },
  { icon: <Brain size={18} />,         label: "Quiz",       href: "/quiz",     color: "from-gBlue2 to-gPurple"},
];

const TIPS = [
  "Always fill 50+ choices in JOSAA — more choices = better upgrade chances.",
  "Home state quota gives you a big rank advantage at your state's NITs.",
  "Round 6 cutoffs are the safest to use for prediction — they're the final closing ranks.",
  "CSE at a lower NIT vs Mechanical at a top NIT — CSE almost always wins for placements.",
  "IIIT Hyderabad CSE is better than most NITs if your rank is under 1000.",
  "Don't ignore GFTIs — DTU and NSUT Delhi have excellent placements at lower fees.",
];

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Not logged in
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gBlue to-gPurple
                          flex items-center justify-center mx-auto mb-6
                          shadow-lg shadow-gBlue/30">
            <User size={28} />
          </div>
          <h1 className="font-display font-bold text-3xl mb-3">
            Sign in to access<br />
            <span className="gemini-text">your Dashboard</span>
          </h1>
          <p className="text-textSecondary text-sm mb-8 leading-relaxed">
            Save your favourite colleges, track your predictions
            and get personalised recommendations.
          </p>
          <button onClick={() => signIn("google")}
            className="flex items-center gap-3 px-8 py-3.5 rounded-xl
                       bg-white text-gray-800 font-semibold text-sm
                       hover:bg-gray-100 transition-all mx-auto
                       shadow-lg">
            <img src="https://www.google.com/favicon.ico" width={18} height={18} alt="Google" />
            Continue with Google
          </button>
        </motion.div>
      </div>
    );
  }

  // Loading
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gBlue
                        border-t-transparent animate-spin" />
      </div>
    );
  }

  // Logged in
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];

  return (
    <div className="min-h-screen bg-bg pt-24 pb-20 px-6 lg:px-16">

      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-5 mb-12">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={56} height={56}
            className="rounded-full border-2 border-gBlue/30
                       shadow-lg shadow-gBlue/20"
          />
        )}
        <div>
          <p className="text-textMuted text-sm mb-0.5">Welcome back 👋</p>
          <h1 className="font-display font-bold text-3xl tracking-tight">
            {session.user?.name?.split(" ")[0]}
            <span className="gemini-text"> — let's find your college!</span>
          </h1>
          <p className="text-textMuted text-xs mt-1">{session.user?.email}</p>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Colleges Available", value: "15+",  color: "text-gBlue2"   },
          { label: "Branches Covered",   value: "10+",  color: "text-gPurple"  },
          { label: "JOSAA Rounds",       value: "6",    color: "text-gMint"    },
          { label: "Years of Data",      value: "2024", color: "text-gBlue2"   },
        ].map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * .08 }}
            className="p-5 rounded-2xl bg-surface border border-white/[0.07]">
            <div className={`text-2xl font-bold font-display ${s.color} mb-1`}>
              {s.value}
            </div>
            <div className="text-xs text-textMuted">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mb-10">
        <h2 className="font-display font-semibold text-lg mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_LINKS.map((l, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .1 + i * .08 }}>
              <Link href={l.href}
                className="flex items-center gap-3 p-4 rounded-2xl
                           bg-surface border border-white/[0.07]
                           hover:border-white/[0.15] hover:-translate-y-1
                           transition-all group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br
                                 ${l.color} flex items-center justify-center
                                 text-white shadow-lg group-hover:scale-110
                                 transition-transform`}>
                  {l.icon}
                </div>
                <span className="font-medium text-sm">{l.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tip of the day */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .4 }}
        className="relative p-6 rounded-2xl border border-gBlue/20
                   bg-gBlue/5 overflow-hidden mb-10">
        <div className="absolute top-0 left-0 right-0 h-px
                        bg-gradient-to-r from-gBlue to-gPurple" />
        <div className="flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div>
            <div className="text-xs font-mono text-gBlue2 uppercase
                            tracking-widest mb-2">
              Counselling Tip
            </div>
            <p className="text-sm text-textSecondary leading-relaxed">
              {tip}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Saved colleges placeholder */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookMarked size={16} className="text-gBlue2" />
          <h2 className="font-display font-semibold text-lg">
            Saved Colleges
          </h2>
        </div>
        <div className="p-10 rounded-2xl bg-surface border border-white/[0.07]
                        text-center">
          <div className="text-4xl mb-4">🏛️</div>
          <p className="text-textSecondary text-sm mb-4">
            No saved colleges yet. Browse colleges and save your favourites!
          </p>
          <Link href="/colleges"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       text-sm font-semibold text-white
                       bg-gradient-to-r from-gBlue to-gPurple
                       hover:shadow-lg hover:shadow-gBlue/25 transition-all">
            Browse Colleges
          </Link>
        </div>
      </div>

    </div>
  );
}