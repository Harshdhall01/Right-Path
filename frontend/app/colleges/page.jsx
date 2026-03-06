"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, TrendingUp, DollarSign } from "lucide-react";
import axios from "axios";

const TYPE_STYLES = {
  NIT:  "bg-gBlue/15 text-gBlue2 border border-gBlue/20",
  IIIT: "bg-gPurple/15 text-gPurple border border-gPurple/20",
  GFTI: "bg-gMint/15 text-gMint border border-gMint/20",
};

const SORT_OPTIONS = ["Cutoff (Low)", "Cutoff (High)", "Placement (High)", "Fees (Low)"];

function SkeletonCard() {
  return (
    <div className="p-5 rounded-2xl bg-surface border border-white/[0.07] animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="w-12 h-6 bg-surface2 rounded-full" />
        <div className="w-20 h-4 bg-surface2 rounded" />
      </div>
      <div className="w-3/4 h-5 bg-surface2 rounded mb-2" />
      <div className="w-1/2 h-3 bg-surface2 rounded mb-5" />
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
        {[0,1,2].map(i => (
          <div key={i}>
            <div className="w-full h-3 bg-surface2 rounded mb-1" />
            <div className="w-2/3 h-4 bg-surface2 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CollegesPage() {
  const [colleges, setColleges]  = useState([]);
  const [loading,  setLoading]   = useState(true);
  const [search,   setSearch]    = useState("");
  const [typeF,    setTypeF]     = useState("All");
  const [sortBy,   setSortBy]    = useState("Cutoff (Low)");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/colleges`
        );
        setColleges(res.data.data);
      } catch (err) {
        console.error("Failed to fetch colleges:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const getMinCutoff = (college) => {
    if (!college.cutoffs?.length) return 99999;
    return Math.min(...college.cutoffs.map(c => c.general || 99999));
  };

  const filtered = colleges
    .filter(c =>
      (typeF === "All" || c.type === typeF) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
       c.state?.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "Cutoff (Low)")     return getMinCutoff(a) - getMinCutoff(b);
      if (sortBy === "Cutoff (High)")    return getMinCutoff(b) - getMinCutoff(a);
      if (sortBy === "Placement (High)") return (b.placements?.avg_salary || 0) - (a.placements?.avg_salary || 0);
      if (sortBy === "Fees (Low)")       return (a.fees?.general || 0) - (b.fees?.general || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-bg pt-24 pb-20 px-6 lg:px-16">

      {/* Header */}
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-gBlue2 text-xs
                            font-mono uppercase tracking-widest mb-3">
              <div className="w-5 h-px bg-gBlue2" />
              {loading ? "Loading..." : `${filtered.length} institutions`}
            </div>
            <h1 className="font-display font-bold text-4xl tracking-tight">
              Explore <span className="gemini-text">Colleges</span>
            </h1>
            <p className="text-textSecondary text-sm mt-2">
              Real cutoffs, placement data and fees — all in one place
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2
                                         text-textMuted" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search college or state..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface
                         border border-white/[0.08] text-sm text-textPrimary
                         placeholder:text-textMuted focus:outline-none
                         focus:border-gBlue/40 transition-all" />
          </div>
        </motion.div>
      </div>

      {/* Filter + Sort bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .1 }}
        className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex gap-2">
          {["All", "NIT", "IIIT", "GFTI"].map(t => (
            <button key={t} onClick={() => setTypeF(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold
                          border transition-all
                ${typeF === t
                  ? "bg-gBlue/15 border-gBlue/40 text-gBlue2"
                  : "bg-surface border-white/[0.08] text-textSecondary hover:border-white/20"
                }`}>
              {t}
            </button>
          ))}
        </div>
        <div className="h-4 w-px bg-white/[0.08] hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-textMuted text-xs">Sort:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="bg-surface border border-white/[0.08] text-xs
                       text-textSecondary rounded-lg px-3 py-1.5
                       focus:outline-none focus:border-gBlue/40 transition-all">
            {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* Loading skeletons */}
        {loading && [...Array(6)].map((_, i) => <SkeletonCard key={i} />)}

        {/* College cards */}
        {!loading && filtered.map((c, i) => (
          <motion.div key={c._id || i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * .03 }}
            whileHover={{ y: -4, transition: { duration: .2 } }}
            className="group p-5 rounded-2xl bg-surface border border-white/[0.07]
                       hover:border-white/[0.15] transition-all cursor-pointer
                       hover:shadow-xl hover:shadow-black/30 relative overflow-hidden">

            <div className="absolute top-0 left-0 right-0 h-px
                            bg-gradient-to-r from-gBlue to-gPurple
                            opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Type badge + NIRF */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full
                               ${TYPE_STYLES[c.type] || TYPE_STYLES.GFTI}`}>
                {c.type}
              </span>
              {c.nirf_rank && (
                <span className="text-[10px] text-textMuted font-mono">
                  NIRF #{c.nirf_rank}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="font-display font-semibold text-base mb-1
                           tracking-tight group-hover:text-gBlue2 transition-colors">
              {c.name}
            </h3>
            <div className="flex items-center gap-1 text-textMuted text-xs mb-5">
              <MapPin size={11} />
              {c.state} · {c.city}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
              <div>
                <div className="text-[10px] text-textMuted mb-1 uppercase tracking-wider">
                  Min Cutoff
                </div>
                <div className="text-sm font-bold text-textPrimary font-mono">
                  {getMinCutoff(c).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-textMuted mb-1 flex items-center gap-1">
                  <DollarSign size={9} /> Fees
                </div>
                <div className="text-sm font-bold text-textPrimary">
                  ₹{c.fees?.general
                    ? (c.fees.general / 100000).toFixed(1) + "L"
                    : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-textMuted mb-1 flex items-center gap-1">
                  <TrendingUp size={9} /> Avg Pkg
                </div>
                <div className="text-sm font-bold text-gMint">
                  ₹{c.placements?.avg_salary
                    ? (c.placements.avg_salary / 100000).toFixed(0) + "L"
                    : "N/A"}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-24 text-textMuted">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-sm">No colleges found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}