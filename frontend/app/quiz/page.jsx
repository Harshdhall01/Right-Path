"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";

const QUESTIONS = [
  {
    q: "How much do you enjoy writing and debugging code for hours?",
    opts: ["Love it — could do it all day", "I enjoy it quite a bit", "It's okay sometimes", "Not really my thing"],
    w: { CSE: [3, 2, 0, -1], ECE: [1, 1, 0, 0], MECH: [0, 0, 1, 2], CIVIL: [0, 0, 1, 1] },
  },
  {
    q: "Are you fascinated by how physical machines and engines work?",
    opts: ["Absolutely fascinated", "Somewhat interested", "A little bit", "Not at all"],
    w: { CSE: [0, 1, 1, 2], ECE: [1, 2, 1, 0], MECH: [3, 2, 1, -1], CIVIL: [1, 1, 2, 2] },
  },
  {
    q: "Would you prefer to work with data, AI and build intelligent systems?",
    opts: ["Yes, that's my dream", "Definitely yes", "Maybe, I'm open to it", "Not really"],
    w: { CSE: [3, 2, 1, 0], ECE: [1, 1, 1, 0], MECH: [0, 0, 1, 2], CIVIL: [0, 0, 0, 2] },
  },
  {
    q: "Does working on hardware — circuits, chips and electronics — interest you?",
    opts: ["A lot!", "Somewhat", "Not much", "Not at all"],
    w: { CSE: [1, 1, 0, 0], ECE: [3, 2, 1, 0], MECH: [1, 1, 2, 2], CIVIL: [0, 0, 1, 2] },
  },
  {
    q: "How do you feel about designing buildings, bridges and infrastructure?",
    opts: ["That's really exciting", "Sounds interesting", "Not sure", "Not for me"],
    w: { CSE: [0, 0, 1, 2], ECE: [0, 0, 1, 1], MECH: [1, 1, 1, 2], CIVIL: [3, 2, 1, -1] },
  },
  {
    q: "How comfortable are you with programming and algorithms?",
    opts: ["Very comfortable", "Getting there", "Still learning", "Not comfortable"],
    w: { CSE: [3, 2, 1, -1], ECE: [2, 1, 1, 0], MECH: [0, 1, 1, 2], CIVIL: [0, 0, 1, 2] },
  },
  {
    q: "Are you interested in how smartphones and IoT devices work internally?",
    opts: ["Deeply fascinated", "Quite interested", "Slightly", "Not much"],
    w: { CSE: [2, 1, 1, 0], ECE: [3, 2, 1, 0], MECH: [1, 1, 1, 1], CIVIL: [0, 0, 1, 1] },
  },
  {
    q: "Do you see yourself working at a top software product company?",
    opts: ["100% yes!", "Probably yes", "Open to anything", "Prefer other industries"],
    w: { CSE: [3, 2, 1, 0], ECE: [1, 1, 1, 0], MECH: [0, 1, 1, 2], CIVIL: [0, 0, 1, 2] },
  },
  {
    q: "How much do you enjoy solving mathematical and analytical problems?",
    opts: ["Love it", "Enjoy it", "It's okay", "Prefer practical work"],
    w: { CSE: [2, 2, 1, 0], ECE: [2, 2, 1, 0], MECH: [2, 2, 1, 1], CIVIL: [2, 2, 1, 1] },
  },
  {
    q: "What kind of impact do you want to make in your career?",
    opts: ["Build software used by millions", "Design next-gen electronic systems", "Create machines that change industries", "Build infrastructure that shapes cities"],
    w: { CSE: [3, 0, 0, 0], ECE: [0, 3, 0, 0], MECH: [0, 0, 3, 0], CIVIL: [0, 0, 0, 3] },
  },
];

const BRANCHES = {
  CSE: {
    name:   "Computer Science & Engineering",
    short:  "CSE",
    icon:   "💻",
    color:  "from-gBlue to-gCyan",
    glow:   "rgba(66,133,244,0.2)",
    desc:   "Perfect match! You have strong analytical and coding aptitude. CSE opens doors to software engineering, AI/ML, data science and product roles at top tech companies.",
    careers:["Software Engineer", "ML Engineer", "Data Scientist", "Product Manager"],
    avg:    "₹15–25 LPA",
    top:    "Google, Microsoft, Amazon, Flipkart",
  },
  ECE: {
    name:   "Electronics & Communication Engineering",
    short:  "ECE",
    icon:   "⚡",
    color:  "from-gPurple to-gBlue",
    glow:   "rgba(167,139,250,0.2)",
    desc:   "Great fit! You balance hardware curiosity with technical skills. ECE leads to VLSI design, embedded systems, telecom and semiconductor roles.",
    careers:["VLSI Designer", "Embedded Engineer", "RF Engineer", "IoT Developer"],
    avg:    "₹8–18 LPA",
    top:    "Qualcomm, Intel, Samsung, TI",
  },
  MECH: {
    name:   "Mechanical Engineering",
    short:  "Mech",
    icon:   "⚙️",
    color:  "from-gMint to-gBlue",
    glow:   "rgba(52,211,153,0.2)",
    desc:   "Strong match! You think in systems and physical structures. Mechanical engineering leads to design, automotive, aerospace and manufacturing careers.",
    careers:["Design Engineer", "Automotive Engineer", "Aerospace Engineer", "Manufacturing"],
    avg:    "₹6–14 LPA",
    top:    "Tata Motors, ISRO, L&T, Mahindra",
  },
  CIVIL: {
    name:   "Civil Engineering",
    short:  "Civil",
    icon:   "🏗️",
    color:  "from-amber-400 to-gMint",
    glow:   "rgba(251,191,36,0.2)",
    desc:   "Good match! You're drawn to building the physical world. Civil engineering offers roles in infrastructure, construction, urban planning and government projects.",
    careers:["Structural Engineer", "Urban Planner", "Project Manager", "Govt. Services"],
    avg:    "₹5–12 LPA",
    top:    "L&T, NHAI, PWD, DLF",
  },
};

export default function QuizPage() {
  const [qIdx,    setQIdx]    = useState(0);
  const [scores,  setScores]  = useState({ CSE: 0, ECE: 0, MECH: 0, CIVIL: 0 });
  const [done,    setDone]    = useState(false);
  const [selected, setSelected] = useState(null);

  const totalQ = QUESTIONS.length;
  const progress = ((qIdx) / totalQ) * 100;

  const pick = (optIdx) => {
    if (selected !== null) return;
    setSelected(optIdx);

    // Update scores
    const q = QUESTIONS[qIdx];
    const newScores = { ...scores };
    Object.keys(newScores).forEach(k => {
      newScores[k] += q.w[k]?.[optIdx] ?? 0;
    });
    setScores(newScores);

    // Next question after short delay
    setTimeout(() => {
      setSelected(null);
      if (qIdx + 1 >= totalQ) setDone(true);
      else setQIdx(i => i + 1);
    }, 500);
  };

  const reset = () => {
    setQIdx(0);
    setScores({ CSE: 0, ECE: 0, MECH: 0, CIVIL: 0 });
    setDone(false);
    setSelected(null);
  };

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);
  const maxScore = sorted[0]?.[1] || 1;

  return (
    <div className="min-h-screen bg-bg pt-24 pb-20 px-6 lg:px-16">

      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-2 text-gPurple
                          text-xs font-mono uppercase tracking-widest mb-4">
            <div className="w-5 h-px bg-gPurple" />
            10 Questions
            <div className="w-5 h-px bg-gPurple" />
          </div>
          <h1 className="font-display font-bold text-4xl tracking-tight mb-3">
            Branch Finder <span className="gemini-text">Quiz</span>
          </h1>
          <p className="text-textSecondary text-sm">
            Answer honestly — find your ideal engineering branch
          </p>
        </motion.div>
      </div>

      {/* Quiz */}
      {!done ? (
        <div className="max-w-2xl mx-auto">

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-textMuted mb-2">
              <span>Question {qIdx + 1} of {totalQ}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gBlue to-gPurple"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={qIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0  }}
              exit={{    opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="relative bg-surface border border-white/[0.07]
                         rounded-2xl p-8 overflow-hidden">

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px
                              bg-gradient-to-r from-gBlue via-gPurple to-gCyan" />

              {/* Question number */}
              <div className="text-[10px] font-mono text-textMuted uppercase
                              tracking-widest mb-4">
                Q{qIdx + 1} / {totalQ}
              </div>

              {/* Question text */}
              <h2 className="font-display font-semibold text-xl leading-snug mb-8">
                {QUESTIONS[qIdx].q}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {QUESTIONS[qIdx].opts.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4 }}
                    onClick={() => pick(i)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl
                                border text-left text-sm font-medium
                                transition-all duration-200
                      ${selected === i
                        ? "border-gBlue/60 bg-gBlue/15 text-gBlue2"
                        : selected !== null
                          ? "border-white/[0.05] bg-surface2/50 text-textMuted opacity-50"
                          : "border-white/[0.08] bg-surface2 text-textSecondary hover:border-gBlue/40 hover:bg-gBlue/8 hover:text-textPrimary"
                      }`}>

                    {/* Option letter */}
                    <div className={`w-7 h-7 rounded-full flex-shrink-0
                                    flex items-center justify-center
                                    text-xs font-bold border transition-all
                      ${selected === i
                        ? "border-gBlue text-gBlue bg-gBlue/15"
                        : "border-white/10 text-textMuted"}`}>
                      {String.fromCharCode(65 + i)}
                    </div>

                    {opt}

                    {selected === i && (
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="ml-auto text-gBlue">
                        ✓
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Hint */}
          <p className="text-center text-textMuted text-xs mt-5">
            Click an answer to proceed — no going back, answer honestly!
          </p>
        </div>

      ) : (

        /* ── RESULTS ── */
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto">

          {/* Top result — big card */}
          {(() => {
            const [topKey] = sorted[0];
            const b = BRANCHES[topKey];
            const pct = Math.round((sorted[0][1] / maxScore) * 100);
            return (
              <motion.div
                initial={{ opacity: 0, scale: .96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative p-8 rounded-2xl border border-white/[0.1]
                           overflow-hidden mb-5"
                style={{ background: `radial-gradient(ellipse at top, ${b.glow}, transparent 65%)` }}>

                <div className="absolute top-0 left-0 right-0 h-px
                                bg-gradient-to-r"
                     style={{ backgroundImage: `linear-gradient(to right, ${b.color.replace('from-','').replace('to-','')})` }} />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="text-xs font-mono text-textMuted uppercase
                                    tracking-widest mb-2">
                      🏆 #1 Best Match
                    </div>
                    <h2 className="font-display font-bold text-2xl mb-1">
                      {b.icon} {b.name}
                    </h2>
                    <p className="text-textSecondary text-sm leading-relaxed
                                  max-w-md">
                      {b.desc}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-4xl font-bold font-display gemini-text">
                      {pct}%
                    </div>
                    <div className="text-xs text-textMuted">match score</div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="text-[10px] text-textMuted uppercase tracking-wider mb-1">
                      Avg Package
                    </div>
                    <div className="text-sm font-semibold text-gMint">{b.avg}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]
                                  sm:col-span-2">
                    <div className="text-[10px] text-textMuted uppercase tracking-wider mb-1">
                      Top Recruiters
                    </div>
                    <div className="text-sm font-semibold">{b.top}</div>
                  </div>
                </div>

                {/* Career paths */}
                <div>
                  <div className="text-[10px] text-textMuted uppercase tracking-wider mb-2">
                    Career Paths
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {b.careers.map((c, i) => (
                      <span key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium
                                   bg-white/[0.06] border border-white/[0.08]
                                   text-textSecondary">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* Other results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {sorted.slice(1).map(([key, score], i) => {
              const b = BRANCHES[key];
              const pct = Math.round((score / maxScore) * 100);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * .08 }}
                  className="p-5 rounded-2xl bg-surface border border-white/[0.07]
                             hover:border-white/[0.13] transition-all">
                  <div className="text-xs text-textMuted mb-3">
                    #{i + 2} Match
                  </div>
                  <div className="text-2xl mb-2">{b.icon}</div>
                  <div className="font-semibold text-sm mb-1">{b.name}</div>
                  <div className="text-xs text-textMuted mb-3">{b.avg}</div>

                  {/* Score bar */}
                  <div className="h-1 bg-surface2 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: .3 + i * .08, duration: .6 }}
                    />
                  </div>
                  <div className="text-right text-[10px] text-textMuted mt-1">
                    {pct}%
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/predict"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                         text-white text-sm bg-gradient-to-r from-gBlue to-gPurple
                         hover:shadow-lg hover:shadow-gBlue/25
                         hover:-translate-y-0.5 transition-all">
              Find Colleges for My Branch
              <ArrowRight size={14} />
            </Link>
            <button onClick={reset}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm
                         font-medium border border-white/10 text-textSecondary
                         hover:bg-white/[0.06] transition-all">
              <RotateCcw size={14} /> Retake Quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}