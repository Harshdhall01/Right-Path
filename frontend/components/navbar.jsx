"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const links = [
  { href: "/",         label: "Home"      },
  { href: "/predict",  label: "Predictor" },
  { href: "/colleges", label: "Colleges"  },
  { href: "/chat",     label: "AI Chat"   },
  { href: "/roi",      label: "ROI Tool"  },
  { href: "/quiz",     label: "Quiz"      },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center
                    justify-between px-10 transition-all duration-300
          ${scrolled
            ? "bg-bg/90 backdrop-blur-2xl border-b border-white/[0.07] shadow-lg shadow-black/20"
            : "bg-transparent"
          }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gBlue to-gPurple
                          flex items-center justify-center text-sm
                          group-hover:shadow-lg group-hover:shadow-gBlue/30 transition-all">
            ✦
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Right<span className="gemini-text">Path</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${active
                      ? "text-textPrimary bg-white/[0.08]"
                      : "text-textSecondary hover:text-textPrimary hover:bg-white/[0.05]"
                    }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          {status === "loading" && (
            <div className="w-8 h-8 rounded-full bg-surface2 animate-pulse" />
          )}

          {status === "unauthenticated" && (
            <>
              <button
                onClick={() => signIn("google")}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm
                           font-medium text-textPrimary hover:bg-white/[0.06]
                           transition-all">
                Sign In
              </button>
              <button
                onClick={() => signIn("google")}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white
                           bg-gradient-to-r from-gBlue to-gPurple
                           hover:shadow-lg hover:shadow-gBlue/30
                           hover:-translate-y-px transition-all
                           flex items-center gap-2">
                <Sparkles size={14} />
                Try Free
              </button>
            </>
          )}

          {status === "authenticated" && (
            <div className="flex items-center gap-3">
              {/* Dashboard link */}
              <Link href="/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-medium
                           text-textSecondary hover:text-textPrimary
                           hover:bg-white/[0.05] transition-all">
                Dashboard
              </Link>

              {/* User avatar + name */}
              <div className="flex items-center gap-2">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={32} height={32}
                    className="rounded-full border border-white/10"
                  />
                )}
                <span className="text-sm font-medium text-textPrimary">
                  {session.user?.name?.split(" ")[0]}
                </span>
              </div>

              {/* Sign out */}
              <button
                onClick={() => signOut()}
                className="px-3 py-2 rounded-lg text-xs font-medium
                           text-textMuted hover:text-textPrimary
                           hover:bg-white/[0.05] transition-all">
                Sign out
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-textSecondary hover:text-textPrimary transition-colors"
          onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1,  y: 0   }}
            exit={{    opacity: 0,  y: -10  }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-surface/95
                       backdrop-blur-2xl border-b border-white/[0.07] md:hidden">
            <ul className="flex flex-col p-4 gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium
                      transition-all
                      ${pathname === l.href
                        ? "text-textPrimary bg-white/[0.08]"
                        : "text-textSecondary hover:text-textPrimary hover:bg-white/[0.05]"
                      }`}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                {status === "authenticated" ? (
                  <button onClick={() => signOut()}
                    className="block w-full px-4 py-3 rounded-lg text-sm
                               font-semibold text-center text-textSecondary
                               border border-white/10">
                    Sign Out
                  </button>
                ) : (
                  <button onClick={() => signIn("google")}
                    className="block w-full px-4 py-3 rounded-lg text-sm
                               font-semibold text-center text-white
                               bg-gradient-to-r from-gBlue to-gPurple">
                    Sign in with Google
                  </button>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}