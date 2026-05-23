"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer style={{ background: "#355872", color: "#9CD5FF" }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-xl"
              style={{ background: "#7AAACE", color: "#355872" }}
            >
              💡
            </div>
            <span className="text-xl font-semibold" style={{ color: "#9CD5FF" }}>IdeaVault</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#7AAACE" }}>
            The platform where startup ideas get discovered, validated, and built — together.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: "#9CD5FF" }}>Platform</h3>
          <ul className="space-y-2 text-sm" style={{ color: "#7AAACE" }}>
            <li>
              <Link href="/ideas" className="transition-colors hover:opacity-90"
                style={{ color: "#7AAACE" }}
                onMouseEnter={e => e.target.style.color = "#9CD5FF"}
                onMouseLeave={e => e.target.style.color = "#7AAACE"}>
                All Ideas
              </Link>
            </li>
            <li>
              <Link href="/ideas?category=AI" className="transition-colors"
                style={{ color: "#7AAACE" }}
                onMouseEnter={e => e.target.style.color = "#9CD5FF"}
                onMouseLeave={e => e.target.style.color = "#7AAACE"}>
                AI & Tech
              </Link>
            </li>
            <li>
              <Link href="/ideas?category=Health" className="transition-colors"
                style={{ color: "#7AAACE" }}
                onMouseEnter={e => e.target.style.color = "#9CD5FF"}
                onMouseLeave={e => e.target.style.color = "#7AAACE"}>
                Health
              </Link>
            </li>
            <li>
              <Link href="/ideas?category=Education" className="transition-colors"
                style={{ color: "#7AAACE" }}
                onMouseEnter={e => e.target.style.color = "#9CD5FF"}
                onMouseLeave={e => e.target.style.color = "#7AAACE"}>
                Education
              </Link>
            </li>
            <li>
              <Link href="/add-idea" className="transition-colors"
                style={{ color: "#7AAACE" }}
                onMouseEnter={e => e.target.style.color = "#9CD5FF"}
                onMouseLeave={e => e.target.style.color = "#7AAACE"}>
                Submit Idea
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: "#9CD5FF" }}>Contact</h3>
          <ul className="space-y-3 text-sm" style={{ color: "#7AAACE" }}>
            <li className="flex items-center gap-2">
              <MdEmail className="text-lg shrink-0" style={{ color: "#9CD5FF" }} />
              <span>hello@ideavault.io</span>
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-lg shrink-0" style={{ color: "#9CD5FF" }} />
              <span>+880 1700-000000</span>
            </li>
            <li className="flex items-start gap-2">
              <MdLocationOn className="text-lg shrink-0 mt-0.5" style={{ color: "#9CD5FF" }} />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: "#9CD5FF" }}>Follow Us</h3>
          <div className="flex gap-3 mb-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
              style={{ background: "#4a7a9b", color: "#9CD5FF" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#7AAACE"; e.currentTarget.style.color = "#355872"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#4a7a9b"; e.currentTarget.style.color = "#9CD5FF"; }}
              aria-label="X Twitter">
              <FaXTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
              style={{ background: "#4a7a9b", color: "#9CD5FF" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#7AAACE"; e.currentTarget.style.color = "#355872"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#4a7a9b"; e.currentTarget.style.color = "#9CD5FF"; }}
              aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
              style={{ background: "#4a7a9b", color: "#9CD5FF" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#7AAACE"; e.currentTarget.style.color = "#355872"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#4a7a9b"; e.currentTarget.style.color = "#9CD5FF"; }}
              aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>

          <h3 className="font-semibold text-base mb-3" style={{ color: "#9CD5FF" }}>Newsletter</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="input input-bordered input-sm flex-1 text-sm"
              style={{
                background: "#2a4a62",
                border: "1px solid #7AAACE",
                color: "#9CD5FF",
              }}
            />
            <button
              className="btn btn-sm"
              style={{ background: "#7AAACE", color: "#355872", fontWeight: 600, border: "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#9CD5FF"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#7AAACE"; }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #4a7a9b" }} />

      {/* Copyright */}
      <div
        className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm"
        style={{ color: "#7AAACE" }}
      >
        <span>© {new Date().getFullYear()} IdeaVault. All rights reserved.</span>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            style={{ color: "#7AAACE" }}
            onMouseEnter={e => e.target.style.color = "#9CD5FF"}
            onMouseLeave={e => e.target.style.color = "#7AAACE"}
            className="transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            style={{ color: "#7AAACE" }}
            onMouseEnter={e => e.target.style.color = "#9CD5FF"}
            onMouseLeave={e => e.target.style.color = "#7AAACE"}
            className="transition-colors"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;