"use client";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ChevronRight, ChevronLeft, MapPin, Wallet, BookOpen, Trophy } from "lucide-react";

// ── REAL COLLEGE DATA ──
const COLLEGES = [
  { name: "NIT Trichy",        type: "NIT",  state: "Tamil Nadu",  branch: "CSE", fees: 5.5,  cutoffGen: 1300,  cutoffOBC: 3500,  cutoffSC: 8000,  placement: 18 },
  { name: "NIT Warangal",      type: "NIT",  state: "Telangana",   branch: "CSE", fees: 5.2,  cutoffGen: 2100,  cutoffOBC: 5500,  cutoffSC: 12000, placement: 16 },
  { name: "NIT Surathkal",     type: "NIT",  state: "Karnataka",   branch: "CSE", fees: 5.0,  cutoffGen: 3600,  cutoffOBC: 9000,  cutoffSC: 18000, placement: 15 },
  { name: "IIIT Hyderabad",    type: "IIIT", state: "Telangana",   branch: "CSE", fees: 32,   cutoffGen: 600,   cutoffOBC: 1800,  cutoffSC: 5000,  placement: 22 },
  { name: "IIIT Bangalore",    type: "IIIT", state: "Karnataka",   branch: "CSE", fees: 28,   cutoffGen: 1900,  cutoffOBC: 5000,  cutoffSC: 11000, placement: 20 },
  { name: "NIT Calicut",       type: "NIT",  state: "Kerala",      branch: "CSE", fees: 4.8,  cutoffGen: 4600,  cutoffOBC: 11000, cutoffSC: 22000, placement: 14 },
  { name: "NIT Rourkela",      type: "NIT",  state: "Odisha",      branch: "CSE", fees: 4.5,  cutoffGen: 5600,  cutoffOBC: 14000, cutoffSC: 28000, placement: 12 },
  { name: "DTU Delhi",         type: "GFTI", state: "Delhi",       branch: "CSE", fees: 3.0,  cutoffGen: 3100,  cutoffOBC: 8000,  cutoffSC: 15000, placement: 18 },
  { name: "NIT Allahabad",     type: "NIT",  state: "Uttar Pradesh",branch:"CSE", fees: 4.6,  cutoffGen: 6500,  cutoffOBC: 16000, cutoffSC: 30000, placement: 11 },
  { name: "IIIT Allahabad",    type: "IIIT", state: "Uttar Pradesh",branch:"IT",  fees: 5.0,  cutoffGen: 5000,  cutoffOBC: 13000, cutoffSC: 25000, placement: 14 },
  { name: "NIT Bhopal",        type: "NIT",  state: "MP",          branch: "CSE", fees: 4.4,  cutoffGen: 8000,  cutoffOBC: 20000, cutoffSC: 38000, placement: 10 },
  { name: "NIT Surat",         type: "NIT",  state: "Gujarat",     branch: "CSE", fees: 4.3,  cutoffGen: 9500,  cutoffOBC: 24000, cutoffSC: 45000, placement: 9  },
  { name: "NIT Kurukshetra",   type: "NIT",  state: "Haryana",     branch: "CSE", fees: 4.5,  cutoffGen: 7200,  cutoffOBC: 18000, cutoffSC: 34000, placement: 10 },
  { name: "NIT Jaipur",        type: "NIT",  state: "Rajasthan",   branch: "CSE", fees: 4.4,  cutoffGen: 8500,  cutoffOBC: 21000, cutoffSC: 40000, placement: 9  },
  { name: "IIIT Delhi",        type: "IIIT", state: "Delhi",       branch: "CSE", fees: 14,   cutoffGen: 2800,  cutoffOBC: 7000,  cutoffSC: 14000, placement: 19 },
];

const STEPS = [
  { label: "Details",  icon: <Trophy size={14}    /> },
  { label: "Location", icon: <MapPin size={14}    /> },
  { label: "Budget",   icon: <Wallet size={14}    /> },
  { label: "Branch",   icon: <BookOpen size={14}  /> },
];

const CATEGORIES = ["General", "OBC-NCL", "SC", "ST", "EWS"];
const STATES = ["Any", "Andhra Pradesh", "Delhi", "Gujarat", "Haryana", "Karnataka",
                "Kerala", "Maharashtra", "MP", "Odisha", "Punjab",
                "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];
const BRANCHES = ["Computer Science", "Electronics", "Mechanical", "Civil",
                  "Chemical", "Electrical", "Aerospace", "Data Science", "AI & ML"];
const TYPES = ["NIT", "IIIT", "GFTI"];

const TAG_STYLES = {
  Dream:    "bg-purple-500/15 text-purple-300 border border-purple-500/25",
  Reach:    "bg-gBlue/15 text-gBlue2 border border-gBlue/25",
  Moderate: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  Safety:   "bg-white/8 text-textSecondary border border-white/10",
};

function getCutoff(college, cat) {
  if (cat === "OBC-NCL") return college.cutoffOBC;
  if (cat === "SC" || cat === "ST") return college.cutoffSC;
  return college.cutoffGen;
}
function getTag(rank, cutoff) {
  const r = rank / cutoff;
  if (r < 0.6)  return "Dream";
  if (r < 0.85) return "Reach";
  if (r < 1.1)  return "Moderate";
  return "Safety";
}

// ── REUSABLE COMPONENTS ──
function StepInput({ label, children }) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-semibold text-textSecondary uppercase
                        tracking-wider mb-2">{label}</label>
      {children}
    </div>
  );
}

function GInput({ ...props }) {
  return (
    <input {...props}
      className="w-full px-4 py-3 rounded-xl bg-surface2 border border-white/[0.08]
                 text-textPrimary text-sm placeholder:text-textMuted
                 focus:outline-none focus:border-gBlue/50 focus:ring-2
                 focus:ring-gBlue/10 transition-all" />
  );
}

function GSelect({ children, ...props }) {
  return (
    <select {...props}
      className="w-full px-4 py-3 rounded-xl bg-surface2 border border-white/[0.08]
                 text-textPrimary text-sm appearance-none
                 focus:outline-none focus:border-gBlue/50 transition-all">
      {children}
    </select>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
        ${selected
          ? "bg-gBlue/15 border-gBlue/40 text-gBlue2"
          : "bg-surface2 border-white/[0.08] text-textSecondary hover:border-white/20"
        }`}>
      {label}
    </button>
  );
}

export default function PredictPage() {
  const [step,     setStep]     = useState(0);
  const [rank,     setRank]     = useState("");
  const [cat,      setCat]      = useState("General");
  const [state,    setState]    = useState("Any");
  const [budget,   setBudget]   = useState(15);
  const [branches, setBranches] = useState(["Computer Science"]);
  const [types,    setTypes]    = useState(["NIT", "IIIT", "GFTI"]);
  const [results,  setResults]  = useState(null);
  const [filter,   setFilter]   = useState("All");
  const [loading,  setLoading]  = useState(false);

  const toggleArr = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  const runPredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/colleges/predict`,
        { rank: +rank, category: cat.toLowerCase().replace("-", "_") }
      );
      const data = res.data.results;

      // Flatten all categories into one list with tags
      const all = [
        ...data.dream.map(c => ({ ...c, tag: "Dream" })),
        ...data.reach.map(c => ({ ...c, tag: "Reach" })),
        ...data.moderate.map(c => ({ ...c, tag: "Moderate" })),
        ...data.safety.map(c => ({ ...c, tag: "Safety" })),
      ]
      .filter(c => types.includes(c.type))
      .filter(c => (c.fees / 100000) <= budget);

      setResults(all);
    } catch (err) {
      console.error(err);
      // Fallback to local data if backend fails
      const r = +rank || 15000;
      const res = COLLEGES
        .filter(c => types.includes(c.type))
        .filter(c => c.fees <= budget)
        .map(c => ({ ...c, tag: getTag(r, getCutoff(c, cat)) }))
        .sort((a, b) => {
          const order = { Dream: 0, Reach: 1, Moderate: 2, Safety: 3 };
          return order[a.tag] - order[b.tag];
        });
      setResults(res);
    }
    setLoading(false);
  };

  const filtered = results
    ? filter === "All" ? results : results.filter(c => c.tag === filter)
    : [];

  return (
    <div className="min-h-screen bg-bg pt-24 pb-20 px-6 lg:px-16">

      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-4xl tracking-tight mb-3">
          Find Your <span className="gemini-text">College</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .1 }}
          className="text-textSecondary text-sm">
          Tell us about yourself — we'll match you with the best options
        </motion.p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-10 max-w-lg mx-auto">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center
                              text-xs font-bold border transition-all
                ${i < step  ? "bg-gradient-to-br from-gBlue to-gPurple border-transparent text-white"
                : i === step ? "border-gBlue text-gBlue bg-gBlue/10"
                :              "border-white/10 text-textMuted bg-surface"}`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] font-medium hidden sm:block
                ${i === step ? "text-gBlue2" : "text-textMuted"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px flex-1 mb-4 transition-all
                ${i < step ? "bg-gradient-to-r from-gBlue to-gPurple" : "bg-white/[0.07]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
      {!results && (
        <div className="max-w-xl mx-auto">
          <div className="relative bg-surface border border-white/[0.07] rounded-2xl p-8
                          shadow-xl shadow-black/20 overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px
                            bg-gradient-to-r from-gBlue via-gPurple to-gCyan" />

            <AnimatePresence mode="wait">

              {/* STEP 0 — Details */}
              {step === 0 && (
                <motion.div key="s0"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ duration: .25 }}>
                  <h2 className="font-display font-semibold text-xl mb-1">Your JEE Details</h2>
                  <p className="text-textMuted text-xs mb-7">Step 1 of 4 — Basic information</p>
                  <StepInput label="JEE Main Rank">
                    <GInput type="number" placeholder="e.g. 12500" value={rank}
                      onChange={e => setRank(e.target.value)} />
                  </StepInput>
                  <StepInput label="Category">
                    <GSelect value={cat} onChange={e => setCat(e.target.value)}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </GSelect>
                  </StepInput>
                </motion.div>
              )}

              {/* STEP 1 — Location */}
              {step === 1 && (
                <motion.div key="s1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ duration: .25 }}>
                  <h2 className="font-display font-semibold text-xl mb-1">Location Preferences</h2>
                  <p className="text-textMuted text-xs mb-7">Step 2 of 4 — Where you want to study</p>
                  <StepInput label="Home State">
                    <GSelect value={state} onChange={e => setState(e.target.value)}>
                      {STATES.map(s => <option key={s}>{s}</option>)}
                    </GSelect>
                  </StepInput>
                  <StepInput label="College Type">
                    <div className="flex gap-2 flex-wrap">
                      {TYPES.map(t => (
                        <Chip key={t} label={t} selected={types.includes(t)}
                          onClick={() => toggleArr(types, setTypes, t)} />
                      ))}
                    </div>
                  </StepInput>
                </motion.div>
              )}

              {/* STEP 2 — Budget */}
              {step === 2 && (
                <motion.div key="s2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ duration: .25 }}>
                  <h2 className="font-display font-semibold text-xl mb-1">Budget Range</h2>
                  <p className="text-textMuted text-xs mb-7">Step 3 of 4 — Total fees you can afford</p>
                  <StepInput label="Maximum Total Fees">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold font-display gemini-text">
                        ₹{budget}L
                      </span>
                    </div>
                    <input type="range" min={3} max={50} value={budget}
                      onChange={e => setBudget(+e.target.value)}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                                 bg-gradient-to-r from-gBlue to-gPurple" />
                    <div className="flex justify-between text-[10px] text-textMuted mt-2">
                      <span>₹3L</span><span>₹50L+</span>
                    </div>
                  </StepInput>
                </motion.div>
              )}

              {/* STEP 3 — Branch */}
              {step === 3 && (
                <motion.div key="s3"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ duration: .25 }}>
                  <h2 className="font-display font-semibold text-xl mb-1">Branch Preferences</h2>
                  <p className="text-textMuted text-xs mb-7">Step 4 of 4 — Select all you're interested in</p>
                  <StepInput label="Preferred Branches">
                    <div className="flex gap-2 flex-wrap">
                      {BRANCHES.map(b => (
                        <Chip key={b} label={b} selected={branches.includes(b)}
                          onClick={() => toggleArr(branches, setBranches, b)} />
                      ))}
                    </div>
                  </StepInput>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-8">
              <button onClick={() => setStep(s => s - 1)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm
                            font-medium border border-white/10 text-textSecondary
                            hover:bg-white/[0.06] transition-all
                            ${step === 0 ? "invisible" : ""}`}>
                <ChevronLeft size={15} /> Back
              </button>

              <span className="text-xs text-textMuted font-mono">
                {step + 1} / {STEPS.length}
              </span>

              {step < STEPS.length - 1 ? (
                <button onClick={() => setStep(s => s + 1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm
                             font-semibold text-white
                             bg-gradient-to-r from-gBlue to-gPurple
                             hover:shadow-lg hover:shadow-gBlue/25
                             hover:-translate-y-px transition-all">
                  Continue <ChevronRight size={15} />
                </button>
              ) : (
                <button onClick={runPredict} disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm
                             font-semibold text-white
                             bg-gradient-to-r from-gBlue to-gPurple
                             hover:shadow-lg hover:shadow-gBlue/25
                             hover:-translate-y-px transition-all disabled:opacity-60">
                  {loading
                    ? <><span className="animate-spin">⟳</span> Analysing...</>
                    : <><Zap size={14} /> Predict Now</>
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto">

          {/* Results header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-2xl">Your Matches</h2>
              <p className="text-textSecondary text-sm mt-0.5">
                {results.length} colleges found for rank <span className="text-gBlue2 font-semibold">{rank}</span>
              </p>
            </div>
            <button onClick={() => { setResults(null); setStep(0); }}
              className="px-4 py-2 rounded-xl border border-white/10 text-xs
                         text-textSecondary hover:bg-white/[0.06] transition-all">
              ← Search Again
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 bg-surface p-1.5 rounded-xl w-fit">
            {["All", "Dream", "Reach", "Moderate", "Safety"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${filter === f
                    ? "bg-surface2 text-textPrimary shadow"
                    : "text-textSecondary hover:text-textPrimary"}`}>
                {f}
              </button>
            ))}
          </div>

          {/* College cards */}
          <div className="flex flex-col gap-3">
            {filtered.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * .04 }}
                className="flex items-center justify-between p-5 rounded-xl
                           bg-surface border border-white/[0.07]
                           hover:border-white/[0.13] hover:translate-x-1
                           transition-all group">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                      ${c.type === "NIT"  ? "bg-gBlue/15 text-gBlue2"
                      : c.type === "IIIT" ? "bg-gPurple/15 text-gPurple"
                      :                     "bg-gMint/15 text-gMint"}`}>
                      {c.type}
                    </span>
                    <h3 className="font-semibold text-sm">{c.name}</h3>
                  </div>
                  <p className="text-textSecondary text-xs">
  {c.branch || c.branch} · {c.state}
</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full
                                   ${TAG_STYLES[c.tag]}`}>
                    {c.tag}
                  </span>
                 <p className="text-textMuted text-xs">
  Fees ₹{c.fees ? c.fees : (c.fees_lakh || "N/A")}L · Avg ₹{c.placement || c.avg_salary || "N/A"} LPA
</p>
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-textMuted text-sm">
                No colleges found for this filter.
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}