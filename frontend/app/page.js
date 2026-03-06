"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, MessageCircle, BarChart2, Brain } from "lucide-react";
import dynamic from "next/dynamic";

const Robot = dynamic(() => import("@/components/Robot"), { ssr: false });

const features = [
  {
    icon: <Zap size={22} />,
    title: "Smart Rank Predictor",
    desc: "Enter rank, category, home state and budget. Get Dream, Reach, Moderate and Safety colleges using real JOSAA cutoff data from all rounds.",
    link: "/predict",
    label: "Try Predictor",
    color: "from-gBlue to-gCyan",
    glow: "rgba(66,133,244,0.15)",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "AI Counsellor Chat",
    desc: "Ask anything about JEE colleges, cutoffs, placements, JOSAA and branch selection. Get expert answers instantly.",
    link: "/chat",
    label: "Start Chatting",
    color: "from-gPurple to-gBlue",
    glow: "rgba(167,139,250,0.15)",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "ROI Calculator",
    desc: "Compare two colleges head to head. See payback period, 5-year net gain and placement stats to make a financial decision.",
    link: "/roi",
    label: "Calculate ROI",
    color: "from-gMint to-gBlue",
    glow: "rgba(52,211,153,0.15)",
  },
  {
    icon: <Brain size={22} />,
    title: "Branch Finder Quiz",
    desc: "Not sure which branch? Answer 10 questions about your interests and get your top 3 recommended branches with matching colleges.",
    link: "/quiz",
    label: "Take the Quiz",
    color: "from-gBlue2 to-gPurple",
    glow: "rgba(138,180,248,0.15)",
  },
];

const stats = [
  { num: "500+",  label: "Colleges"        },
  { num: "50K+",  label: "Students Helped" },
  { num: "98%",   label: "Accuracy"        },
  { num: "Free",  label: "Always"          },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2
                          items-center px-8 lg:px-16 pt-16">
        <div className="aurora" />
        <div className="hero-grid" />

        {/* Left content */}
        <div className="relative z-10 py-20 lg:py-0 lg:pr-12">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: .6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       border border-gBlue/25 bg-gBlue/10 mb-8"
          >
            <Sparkles size={13} className="text-gBlue animate-pulse2" />
            <span className="text-xs font-semibold text-gBlue2 font-mono">
              AI-Powered · JEE 2026 Ready
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: .6, delay: .08 }}
            className="font-display font-bold leading-[1.07] tracking-tight mb-6"
            style={{ fontSize: "clamp(38px, 5vw, 68px)", letterSpacing: "-1.5px" }}
          >
            The AI that finds<br />
            <span className="gemini-text">your right college</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: .6, delay: .16 }}
            className="text-textSecondary text-base lg:text-lg leading-relaxed
                       max-w-md mb-10"
          >
            Enter your JEE rank and let RightPath analyse 500+ colleges,
            predict your admission chances, and guide every step of
            JOSAA counselling — completely free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: .6, delay: .24 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <Link
              href="/predict"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl
                         bg-gradient-to-r from-gBlue to-gPurple text-white
                         font-semibold text-sm
                         shadow-lg shadow-gBlue/30
                         hover:shadow-gBlue/50 hover:-translate-y-0.5
                         transition-all duration-200"
            >
              <Zap size={15} />
              Predict My College
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl
                         border border-white/10 bg-white/[0.04]
                         text-textPrimary font-medium text-sm
                         hover:bg-white/[0.08] hover:border-white/20
                         transition-all duration-200"
            >
              <MessageCircle size={15} />
              Chat with AI
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: .6, delay: .32 }}
            className="flex gap-0 flex-wrap"
          >
            {stats.map((s, i) => (
              <div key={i}
                className={`pr-8 mr-8 ${i < stats.length - 1 ? "border-r border-white/[0.08]" : ""}`}
              >
                <div className="text-2xl font-bold font-display
                                bg-gradient-to-r from-white to-gBlue2
                                bg-clip-text text-transparent">
                  {s.num}
                </div>
                <div className="text-xs text-textMuted uppercase tracking-wider mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D Robot */}
        <motion.div
          initial={{ opacity: 0, scale: .92 }}
          animate={{ opacity: 1,  scale: 1   }}
          transition={{ duration: .9, delay: .1 }}
          className="relative h-[520px] lg:h-screen max-h-[700px]"
        >
          {/* Glow behind robot */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 55%, rgba(66,133,244,0.13) 0%, rgba(167,139,250,0.07) 40%, transparent 70%)",
            }}
          />
          <Robot />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1  }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-16 flex items-center gap-3
                     text-textMuted text-xs font-mono"
        >
          <div className="w-8 h-px bg-gradient-to-r from-gBlue to-transparent" />
          Scroll to explore
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-8 lg:px-16 py-28">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-gBlue2 text-xs
                          font-mono uppercase tracking-widest mb-4">
            <div className="w-6 h-px bg-gBlue2" />
            Everything you need
          </div>
          <h2 className="font-display font-bold tracking-tight leading-tight"
              style={{ fontSize: "clamp(28px, 3.5vw, 46px)", letterSpacing: "-1px" }}>
            Built for serious JEE<br />
            <span className="gemini-text">decision making</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .5, delay: i * .08 }}
              whileHover={{ y: -4 }}
              className="group relative p-7 rounded-2xl
                         bg-surface border border-white/[0.07]
                         hover:border-white/[0.13]
                         transition-all duration-300 overflow-hidden"
              style={{ boxShadow: `0 0 0 0 ${f.glow}` }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 40px ${f.glow}`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 0 ${f.glow}`}
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-px
                               bg-gradient-to-r ${f.color} opacity-0
                               group-hover:opacity-100 transition-opacity`} />

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center
                               bg-gradient-to-br ${f.color} text-white mb-5
                               shadow-lg`}>
                {f.icon}
              </div>

              <h3 className="font-display font-semibold text-lg mb-3
                             tracking-tight text-textPrimary">
                {f.title}
              </h3>
              <p className="text-textSecondary text-sm leading-relaxed mb-5">
                {f.desc}
              </p>
              <Link
                href={f.link}
                className={`inline-flex items-center gap-1.5 text-sm font-medium
                             bg-gradient-to-r ${f.color}
                             bg-clip-text text-transparent
                             group-hover:gap-2.5 transition-all`}
              >
                {f.label}
                <ArrowRight size={14} className={`bg-gradient-to-r ${f.color}
                  [&>path]:stroke-current text-gBlue`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-8 lg:px-16 py-20 border-t border-white/[0.05]">
        <div className="mb-14">
          <div className="flex items-center gap-2 text-gPurple text-xs
                          font-mono uppercase tracking-widest mb-4">
            <div className="w-6 h-px bg-gPurple" />
            How it works
          </div>
          <h2 className="font-display font-bold tracking-tight"
              style={{ fontSize: "clamp(26px, 3vw, 42px)", letterSpacing: "-1px" }}>
            Three steps to <span className="gemini-text">clarity</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: "01", title: "Enter Your Rank", desc: "Input your JEE rank, category, home state and budget range." },
            { n: "02", title: "AI Analyses",     desc: "Our AI scans 500+ colleges, matches cutoffs, placement data and your preferences in seconds." },
            { n: "03", title: "Get Your List",   desc: "Receive a personalised list sorted by Dream, Reach, Moderate and Safety with full details." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .5, delay: i * .1 }}
              className="p-7 rounded-2xl bg-surface border border-white/[0.07]
                         hover:border-white/[0.13] transition-all"
            >
              <div className="text-5xl font-bold font-display mb-5
                              bg-gradient-to-br from-gBlue/20 to-gPurple/20
                              bg-clip-text text-transparent tracking-tighter">
                {step.n}
              </div>
              <h3 className="font-semibold text-base mb-2">{step.title}</h3>
              <p className="text-textSecondary text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-8 lg:px-16 py-24 text-center relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(66,133,244,0.07) 0%, transparent 70%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold mb-4 tracking-tight"
              style={{ fontSize: "clamp(30px, 4vw, 56px)", letterSpacing: "-1.5px" }}>
            Ready to find your<br />
            <span className="gemini-text">right path?</span>
          </h2>
          <p className="text-textSecondary mb-10 text-base">
            Free forever. No signup required. Results in seconds.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/predict"
              className="flex items-center gap-2 px-8 py-4 rounded-xl
                         bg-gradient-to-r from-gBlue to-gPurple text-white
                         font-semibold text-base shadow-lg shadow-gBlue/30
                         hover:shadow-gBlue/50 hover:-translate-y-0.5 transition-all">
              <Zap size={16} /> Start Predicting Now
            </Link>
            <Link href="/chat"
              className="flex items-center gap-2 px-8 py-4 rounded-xl
                         border border-white/10 bg-white/[0.04]
                         text-textPrimary font-medium text-base
                         hover:bg-white/[0.08] transition-all">
              <MessageCircle size={16} /> Chat with AI
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}