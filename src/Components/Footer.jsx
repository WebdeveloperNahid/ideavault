"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer style={{ background: "#0b1521", color: "#ffffff" }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-xl"
              style={{ background: "#1999f5", color: "#ffffff" }}
            >
              💡
            </div>
            <span className="text-xl font-semibold" style={{ color: "#1999f5" }}>IdeaVault</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            The platform where startup ideas get discovered, validated, and built — together.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: "#ffffff" }}>Platform</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/ideas" className="transition-colors duration-200"
                style={{ color: "#94a3b8" }}
                onMouseEnter={e => e.target.style.color = "#1999f5"}
                onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                All Ideas
              </Link>
            </li>
            <li>
              <Link href="/ideas?category=AI" className="transition-colors duration-200"
                style={{ color: "#94a3b8" }}
                onMouseEnter={e => e.target.style.color = "#1999f5"}
                onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                AI & Tech
              </Link>
            </li>
            <li>
              <Link href="/ideas?category=Health" className="transition-colors duration-200"
                style={{ color: "#94a3b8" }}
                onMouseEnter={e => e.target.style.color = "#1999f5"}
                onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                Health
              </Link>
            </li>
            <li>
              <Link href="/ideas?category=Education" className="transition-colors duration-200"
                style={{ color: "#94a3b8" }}
                onMouseEnter={e => e.target.style.color = "#1999f5"}
                onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                Education
              </Link>
            </li>
            <li>
              <Link href="/add-idea" className="transition-colors duration-200"
                style={{ color: "#94a3b8" }}
                onMouseEnter={e => e.target.style.color = "#1999f5"}
                onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                Submit Idea
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: "#ffffff" }}>Contact</h3>
          <ul className="space-y-3 text-sm" style={{ color: "#94a3b8" }}>
            <li className="flex items-center gap-2">
              <MdEmail className="text-lg shrink-0" style={{ color: "#1999f5" }} />
              <span>hello@ideavault.io</span>
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-lg shrink-0" style={{ color: "#1999f5" }} />
              <span>+880 1700-000000</span>
            </li>
            <li className="flex items-start gap-2">
              <MdLocationOn className="text-lg shrink-0 mt-0.5" style={{ color: "#1999f5" }} />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: "#ffffff" }}>Follow Us</h3>
          <div className="flex gap-3 mb-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ background: "#1e293b", color: "#1999f5" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1999f5"; e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#1999f5"; }}
              aria-label="X Twitter">
              <FaXTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ background: "#1e293b", color: "#1999f5" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1999f5"; e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#1999f5"; }}
              aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ background: "#1e293b", color: "#1999f5" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1999f5"; e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#1999f5"; }}
              aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>

          <h3 className="font-semibold text-base mb-3" style={{ color: "#ffffff" }}>Newsletter</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="input input-bordered input-sm flex-1 text-sm outline-none focus:border-[#1999f5]"
              style={{
                background: "#122031",
                border: "1px solid #1e293b",
                color: "#ffffff",
              }}
            />
            <button
              className="btn btn-sm border-none"
              style={{ background: "#1999f5", color: "#ffffff", fontWeight: 600 }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1180cf"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1999f5"; }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #1e293b" }} />

      {/* Copyright */}
      <div
        className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm"
        style={{ color: "#94a3b8" }}
      >
        <span>© {new Date().getFullYear()} IdeaVault. All rights reserved.</span>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            style={{ color: "#94a3b8" }}
            onMouseEnter={e => e.target.style.color = "#1999f5"}
            onMouseLeave={e => e.target.style.color = "#94a3b8"}
            className="transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            style={{ color: "#94a3b8" }}
            onMouseEnter={e => e.target.style.color = "#1999f5"}
            onMouseLeave={e => e.target.style.color = "#94a3b8"}
            className="transition-colors duration-200"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;