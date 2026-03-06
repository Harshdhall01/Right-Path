"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plus, Sparkles, User } from "lucide-react";

const STARTERS = [
  "Which NIT is best for Computer Science?",
  "Compare IIIT Hyderabad vs NIT Trichy for CSE",
  "Explain JOSAA counselling rounds in detail",
  "Which branch has the highest placement packages?",
  "What is the cutoff for NIT Warangal CSE General?",
  "Is NIT better than a top private college?",
];

const AI_RESPONSES = {
  default: "That's a great question about JEE counselling! Based on current JOSAA data, I'd recommend considering your rank, preferred branch, location and budget together. Would you like me to give specific college recommendations or explain a particular aspect in more detail?",
  trichy: "NIT Trichy is consistently ranked as the <strong>top NIT in India</strong>. For CSE, the closing rank for General category is around <strong>1,200–1,400</strong> in JOSAA. Average package is ₹18 LPA with companies like Google, Microsoft and Amazon visiting campus. Total fees are around ₹5.5 Lakhs for 4 years.",
  josaa: "JOSAA runs <strong>6 rounds</strong> of counselling for IITs, NITs, IIITs and GFTIs. Here's the process:<br/><br/>1️⃣ Register on josaa.nic.in<br/>2️⃣ Fill choices (up to 100+ college-branch pairs)<br/>3️⃣ Lock choices before deadline<br/>4️⃣ Seat allotment round by round<br/>5️⃣ Report to institute and pay fees<br/><br/><strong>Tip:</strong> Always fill more choices — more options = better upgrade chances.",
  cse: "Top NITs for CSE ranked by placements:<br/><br/>🥇 <strong>NIT Trichy</strong> — Rank ~1,300 | ₹18 LPA avg<br/>🥈 <strong>NIT Warangal</strong> — Rank ~2,100 | ₹16 LPA avg<br/>🥉 <strong>NIT Surathkal</strong> — Rank ~3,600 | ₹15 LPA avg<br/>4️⃣ <strong>NIT Calicut</strong> — Rank ~4,600 | ₹14 LPA avg<br/><br/>All cutoffs are for General category CSE branch.",
  iiith: "IIIT Hyderabad is often considered <strong>better than most NITs for CS</strong>.<br/><br/>• Closing rank: ~600 (General, BTech CSE)<br/>• Fees: ~₹8L/year (₹32L total)<br/>• Avg package: ₹22 LPA<br/>• Highest: ₹1.5 Crore (international offers)<br/>• Excellent research culture<br/><br/>If your rank is under 800 — seriously consider IIIT-H over any NIT.",
  placement: "Placement averages for CSE across top colleges:<br/><br/>• IIIT Hyderabad: ₹22 LPA<br/>• IIIT Delhi: ₹19 LPA<br/>• NIT Trichy: ₹18 LPA<br/>• DTU Delhi: ₹18 LPA<br/>• NIT Warangal: ₹16 LPA<br/>• NIT Surathkal: ₹15 LPA<br/><br/>These are <em>average</em> packages. FAANG offers range ₹40–80 LPA from these colleges.",
  private: "<strong>Honest comparison:</strong><br/><br/>✅ NIT > average private college (always)<br/>✅ NIT > most good private colleges<br/>⚖️ Top NITs ≈ BITS Pilani for some branches<br/><br/>Key facts:<br/>• NITs fees: ₹4–6L total<br/>• Private: ₹10–30L total<br/>• Peer group at NITs stronger due to JEE filter<br/>• NIT brand is recognised pan-India by recruiters",
  warangal: "NIT Warangal CSE cutoffs (General category):<br/><br/>• Round 1: ~1,800<br/>• Round 2: ~1,950<br/>• Round 3: ~2,050<br/>• Round 6 (final): ~2,100<br/><br/>Average placement: ₹16 LPA. Top recruiters include Microsoft, Amazon, Wipro, TCS. Total fees: ₹5.2 Lakhs.",
  budget: "Here's a quick fee comparison:<br/><br/>• NITs: ₹4–6 Lakhs total (4 years)<br/>• IIITs: ₹5–32 Lakhs total<br/>• GFTIs like DTU: ₹3–4 Lakhs total<br/>• Private (top): ₹12–20 Lakhs total<br/><br/><strong>SC/ST students</strong> get heavily subsidised fees at NITs — often just ₹1–1.5L total!",
  branch: "Most popular branches by demand and packages:<br/><br/>🥇 <strong>CSE</strong> — Highest demand, ₹15–25 LPA avg<br/>🥈 <strong>ECE</strong> — Good for hardware + software, ₹8–18 LPA<br/>🥉 <strong>Mechanical</strong> — Core + IT roles, ₹6–14 LPA<br/>4️⃣ <strong>Civil</strong> — Govt + infra roles, ₹5–10 LPA<br/><br/><strong>Tip:</strong> A good college with lower branch > average college with CSE.",
};

function getResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes("trichy"))                              return AI_RESPONSES.trichy;
  if (m.includes("josaa") || m.includes("counsel"))     return AI_RESPONSES.josaa;
  if (m.includes("best nit") || m.includes("top nit"))  return AI_RESPONSES.cse;
  if (m.includes("iiit hyderabad") || m.includes("iiit-h")) return AI_RESPONSES.iiith;
  if (m.includes("placement") || m.includes("package")) return AI_RESPONSES.placement;
  if (m.includes("private"))                            return AI_RESPONSES.private;
  if (m.includes("warangal"))                           return AI_RESPONSES.warangal;
  if (m.includes("fee") || m.includes("budget") || m.includes("cost")) return AI_RESPONSES.budget;
  if (m.includes("branch") || m.includes("cse") || m.includes("ece")) return AI_RESPONSES.branch;
  return AI_RESPONSES.default;
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center
                       justify-center text-sm font-bold
        ${isUser
          ? "bg-surface2 border border-white/10"
          : "bg-gradient-to-br from-gBlue to-gPurple"}`}>
        {isUser ? <User size={14} /> : <Sparkles size={14} />}
      </div>
      <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed
        ${isUser
          ? "bg-gBlue/15 border border-gBlue/20 text-textPrimary rounded-tr-sm"
          : "bg-surface border border-white/[0.07] text-textPrimary rounded-tl-sm"}`}
        dangerouslySetInnerHTML={{ __html: msg.content }}
      />
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center
                      justify-center bg-gradient-to-br from-gBlue to-gPurple">
        <Sparkles size={14} />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-surface
                      border border-white/[0.07] flex items-center gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            animate={{ scale: [.6, 1, .6], opacity: [.4, 1, .4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * .2 }}
            className="w-1.5 h-1.5 bg-textSecondary rounded-full" />
        ))}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState("");
  const [typing,    setTyping]    = useState(false);
  const [started,   setStarted]   = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setStarted(true);

    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setTyping(true);

    // Simulate AI thinking delay
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 600));
    setTyping(false);
    setMessages(prev => [...prev, { role: "ai", content: getResponse(msg) }]);
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const newChat = () => {
    setMessages([]);
    setStarted(false);
    setInput("");
  };

  return (
    <div className="h-screen bg-bg flex pt-16">

      {/* SIDEBAR */}
      <div className="w-64 flex-shrink-0 bg-surface border-r border-white/[0.07]
                      flex-col p-4 gap-3 hidden lg:flex">
        <button onClick={newChat}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                     bg-gBlue/10 border border-gBlue/20 text-gBlue2
                     text-sm font-medium hover:bg-gBlue/18 transition-all">
          <Plus size={15} /> New conversation
        </button>

        <div className="text-[10px] font-semibold text-textMuted uppercase
                        tracking-widest px-2 pt-2">
          Suggested topics
        </div>

        {STARTERS.map((s, i) => (
          <button key={i} onClick={() => send(s)}
            className="text-left px-3 py-2.5 rounded-xl text-xs text-textSecondary
                       hover:bg-white/[0.05] hover:text-textPrimary
                       transition-all leading-relaxed">
            {s}
          </button>
        ))}
      </div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="h-14 border-b border-white/[0.07] flex items-center
                        px-6 gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gBlue to-gPurple
                          flex items-center justify-center">
            <Sparkles size={15} />
          </div>
          <div>
            <div className="text-sm font-semibold">RightPath AI</div>
            <div className="text-[10px] text-textMuted">Your Personal JEE Counsellor</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gMint animate-pulse2" />
            <span className="text-[10px] text-textMuted">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">

          {/* Welcome screen */}
          {!started && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center
                         h-full text-center gap-5 pb-10">
              <div className="w-16 h-16 rounded-full
                              bg-gradient-to-br from-gBlue to-gPurple
                              flex items-center justify-center
                              shadow-lg shadow-gBlue/30">
                <Sparkles size={28} />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl mb-2">
                  Hello, I'm RightPath AI
                </h2>
                <p className="text-textSecondary text-sm max-w-sm leading-relaxed">
                  Ask me anything about JEE colleges, cutoffs,
                  placements, JOSAA or branch selection.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5
                              w-full max-w-lg mt-2">
                {STARTERS.slice(0, 4).map((s, i) => (
                  <button key={i} onClick={() => send(s)}
                    className="p-3.5 rounded-xl bg-surface border border-white/[0.07]
                               text-left text-xs text-textSecondary
                               hover:border-white/[0.15] hover:text-textPrimary
                               hover:bg-surface2 transition-all leading-relaxed">
                    {s} →
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((m, i) => <Message key={i} msg={m} />)}
          </AnimatePresence>

          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-white/[0.07] flex-shrink-0">
          <div className="flex items-end gap-3 bg-surface border border-white/[0.08]
                          rounded-2xl px-4 py-3
                          focus-within:border-gBlue/40
                          focus-within:shadow-lg focus-within:shadow-gBlue/10
                          transition-all">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about colleges, cutoffs, placements..."
              className="flex-1 bg-transparent text-sm text-textPrimary
                         placeholder:text-textMuted resize-none outline-none
                         leading-relaxed max-h-32"
            />
            <button onClick={() => send()}
              disabled={!input.trim() || typing}
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center
                         justify-center bg-gradient-to-br from-gBlue to-gPurple
                         disabled:opacity-40 hover:shadow-lg
                         hover:shadow-gBlue/30 transition-all">
              <Send size={13} />
            </button>
          </div>
          <p className="text-[10px] text-textMuted text-center mt-2">
            RightPath AI · Based on latest JOSAA data
          </p>
        </div>
      </div>
    </div>
  );
}