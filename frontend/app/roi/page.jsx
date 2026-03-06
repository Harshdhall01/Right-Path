"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, TrendingUp, Clock, DollarSign, Trophy, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function GInput({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-textSecondary
                        uppercase tracking-wider mb-2">{label}</label>
      <input {...props}
        className="w-full px-4 py-3 rounded-xl bg-surface2 border border-white/[0.08]
                   text-textPrimary text-sm placeholder:text-textMuted
                   focus:outline-none focus:border-gBlue/50
                   focus:ring-2 focus:ring-gBlue/10 transition-all" />
    </div>
  );
}

function MetricCard({ label, value, sub, highlight }) {
  return (
    <div className={`p-4 rounded-xl border transition-all
      ${highlight
        ? "bg-gBlue/10 border-gBlue/25"
        : "bg-surface2 border-white/[0.07]"}`}>
      <div className="text-[10px] text-textMuted uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className={`text-xl font-bold font-display tracking-tight
        ${highlight ? "text-gBlue2" : "text-textPrimary"}`}>
        {value}
      </div>
      {sub && <div className="text-[10px] text-textMuted mt-0.5">{sub}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-xs shadow-xl">
      <p className="text-textMuted mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: ₹{p.value.toFixed(1)}L
        </p>
      ))}
    </div>
  );
};

export default function ROIPage() {
  const [cA, setCA] = useState({ name: "", fees: "", salary: "", growth: "12" });
  const [cB, setCB] = useState({ name: "", fees: "", salary: "", growth: "12" });
  const [result, setResult] = useState(null);

  const calc = () => {
    const fA = +cA.fees, sA = +cA.salary, gA = +cA.growth / 100;
    const fB = +cB.fees, sB = +cB.salary, gB = +cB.growth / 100;
    if (!fA || !sA || !fB || !sB) return;

    const earn = (sal, g, yrs) => {
      let total = 0, s = sal;
      for (let i = 0; i < yrs; i++) { total += s; s *= (1 + g); }
      return total;
    };

    const e5A = earn(sA, gA, 5),  e5B = earn(sB, gB, 5);
    const e10A = earn(sA, gA, 10), e10B = earn(sB, gB, 10);
    const net5A = e5A - fA,  net5B = e5B - fB;
    const net10A = e10A - fA, net10B = e10B - fB;
    const pbA = Math.ceil(fA / (sA / 12));
    const pbB = Math.ceil(fB / (sB / 12));

    const chartData = [1, 2, 3, 4, 5].map(yr => ({
      year: `Year ${yr}`,
      [cA.name || "College A"]: +earn(sA, gA, yr).toFixed(1),
      [cB.name || "College B"]: +earn(sB, gB, yr).toFixed(1),
    }));

    setResult({
      A: { net5: net5A, net10: net10A, pb: pbA, e5: e5A, e10: e10A },
      B: { net5: net5B, net10: net10B, pb: pbB, e5: e5B, e10: e10B },
      winnerA: net5A > net5B,
      chartData,
    });
  };

  return (
    <div className="min-h-screen bg-bg pt-24 pb-20 px-6 lg:px-16">

      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-2 text-gBlue2
                          text-xs font-mono uppercase tracking-widest mb-4">
            <div className="w-5 h-px bg-gBlue2" />
            Financial Analysis
            <div className="w-5 h-px bg-gBlue2" />
          </div>
          <h1 className="font-display font-bold text-4xl tracking-tight mb-3">
            ROI <span className="gemini-text">Calculator</span>
          </h1>
          <p className="text-textSecondary text-sm max-w-md mx-auto">
            Compare the real financial value of two colleges.
            See payback period, 5-year and 10-year net gains.
          </p>
        </motion.div>
      </div>

      {/* Input cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 mb-8 max-w-5xl mx-auto">

        {/* College A */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="relative bg-surface border border-white/[0.07]
                     rounded-2xl p-6 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px
                          bg-gradient-to-r from-gBlue to-gCyan" />
          <h3 className="font-display font-semibold text-base mb-5
                         flex items-center gap-2">
            🏛️ College A
          </h3>
          <GInput label="College Name"    placeholder="e.g. NIT Trichy"
            value={cA.name}   onChange={e => setCA({ ...cA, name: e.target.value })} />
          <GInput label="Total Fees (₹ Lakhs)" type="number" placeholder="e.g. 5.5"
            value={cA.fees}   onChange={e => setCA({ ...cA, fees: e.target.value })} />
          <GInput label="Starting Salary (₹ LPA)" type="number" placeholder="e.g. 18"
            value={cA.salary} onChange={e => setCA({ ...cA, salary: e.target.value })} />
          <GInput label="Annual Growth (%)" type="number" placeholder="e.g. 12"
            value={cA.growth} onChange={e => setCA({ ...cA, growth: e.target.value })} />
        </motion.div>

        {/* VS divider */}
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-surface2 border border-white/10
                          flex items-center justify-center text-xs font-bold
                          text-textSecondary">
            VS
          </div>
        </div>

        {/* College B */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="relative bg-surface border border-white/[0.07]
                     rounded-2xl p-6 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px
                          bg-gradient-to-r from-gPurple to-gBlue" />
          <h3 className="font-display font-semibold text-base mb-5
                         flex items-center gap-2">
            🏫 College B
          </h3>
          <GInput label="College Name"    placeholder="e.g. NIT Warangal"
            value={cB.name}   onChange={e => setCB({ ...cB, name: e.target.value })} />
          <GInput label="Total Fees (₹ Lakhs)" type="number" placeholder="e.g. 5.2"
            value={cB.fees}   onChange={e => setCB({ ...cB, fees: e.target.value })} />
          <GInput label="Starting Salary (₹ LPA)" type="number" placeholder="e.g. 16"
            value={cB.salary} onChange={e => setCB({ ...cB, salary: e.target.value })} />
          <GInput label="Annual Growth (%)" type="number" placeholder="e.g. 12"
            value={cB.growth} onChange={e => setCB({ ...cB, growth: e.target.value })} />
        </motion.div>
      </div>

      {/* Calculate button */}
      <div className="flex justify-center mb-10">
        <button onClick={calc}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold
                     text-white bg-gradient-to-r from-gBlue to-gPurple
                     hover:shadow-lg hover:shadow-gBlue/30
                     hover:-translate-y-0.5 transition-all text-sm">
          <BarChart2 size={16} /> Calculate ROI
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto space-y-6">

            {/* Winner banner */}
            <div className={`p-5 rounded-2xl border flex items-center gap-4
              ${result.winnerA
                ? "bg-gBlue/10 border-gBlue/25"
                : "bg-gPurple/10 border-gPurple/25"}`}>
              <div className="text-3xl">🏆</div>
              <div>
                <div className="font-display font-bold text-lg">
                  {result.winnerA
                    ? (cA.name || "College A")
                    : (cB.name || "College B")} wins!
                </div>
                <div className="text-textSecondary text-sm">
                  Better 5-year ROI by ₹
                  {Math.abs(result.A.net5 - result.B.net5).toFixed(1)} Lakhs
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-xs
                              font-semibold text-gMint">
                <Trophy size={14} /> Higher Return
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* College A metrics */}
              <div className={`p-6 rounded-2xl border
                ${result.winnerA
                  ? "bg-gBlue/5 border-gBlue/20"
                  : "bg-surface border-white/[0.07]"}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">
                    {cA.name || "College A"}
                  </h3>
                  {result.winnerA && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full
                                     bg-gBlue/15 text-gBlue2 border border-gBlue/25">
                      ✓ Better ROI
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard label="Payback Period"
                    value={`${result.A.pb} months`}
                    highlight={result.A.pb < result.B.pb} />
                  <MetricCard label="5-Year Net Gain"
                    value={`₹${result.A.net5.toFixed(1)}L`}
                    highlight={result.winnerA} />
                  <MetricCard label="5-Year Earnings"
                    value={`₹${result.A.e5.toFixed(1)}L`} />
                  <MetricCard label="10-Year Net Gain"
                    value={`₹${result.A.net10.toFixed(1)}L`}
                    highlight={result.winnerA} />
                </div>
              </div>

              {/* College B metrics */}
              <div className={`p-6 rounded-2xl border
                ${!result.winnerA
                  ? "bg-gPurple/5 border-gPurple/20"
                  : "bg-surface border-white/[0.07]"}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">
                    {cB.name || "College B"}
                  </h3>
                  {!result.winnerA && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full
                                     bg-gPurple/15 text-gPurple border border-gPurple/25">
                      ✓ Better ROI
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard label="Payback Period"
                    value={`${result.B.pb} months`}
                    highlight={result.B.pb < result.A.pb} />
                  <MetricCard label="5-Year Net Gain"
                    value={`₹${result.B.net5.toFixed(1)}L`}
                    highlight={!result.winnerA} />
                  <MetricCard label="5-Year Earnings"
                    value={`₹${result.B.e5.toFixed(1)}L`} />
                  <MetricCard label="10-Year Net Gain"
                    value={`₹${result.B.net10.toFixed(1)}L`}
                    highlight={!result.winnerA} />
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-surface border border-white/[0.07] rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-6 flex items-center gap-2">
                <TrendingUp size={16} className="text-gBlue" />
                5-Year Cumulative Earnings
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={result.chartData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: "#8a96a8", fontSize: 11 }}
                    axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#8a96a8", fontSize: 11 }}
                    axisLine={false} tickLine={false}
                    tickFormatter={v => `₹${v}L`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey={cA.name || "College A"}
                    fill="#4285f4" radius={[6, 6, 0, 0]} />
                  <Bar dataKey={cB.name || "College B"}
                    fill="#a78bfa" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}