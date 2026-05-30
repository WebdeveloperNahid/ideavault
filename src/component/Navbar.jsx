"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../public/images/logo.png";

import ThemeToggler from "./ThemeToggler";
import Link from "next/link";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/add-idea", label: "Add Idea" },
  { href: "/my-ideas", label: "My Ideas" },
  { href: "/my-interactions", label: "My Interactions" },
  { href: "/login", lable: "Login" },
  { href: "/registration", lable: "Registration" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Robust active check
  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="bg-white text-[#1999f5]">
      <div className="flex items-center justify-between h-15 px-4">
        <div>
          <Image src={logo} height={90} width={90} alt="logo" />
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center justify-center gap-4 font-semibold">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`duration-100 border-b-2 ${
                  isActive(link.href)
                    ? "border-b-[#1999f5]"
                    : "border-b-transparent hover:border-b-[#9CD5FF]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="font-semibold hover:underline cursor-pointer">
            Login
          </Link>
          <Link href="/registration" className="font-semibold hover:underline cursor-pointer">
            Registration
          </Link>
          <ThemeToggler />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/login" className="font-semibold text-sm hover:underline cursor-pointer">
            Login
          </Link>
          <Link href="/registation" className="font-semibold text-sm hover:underline cursor-pointer"></Link>
          <ThemeToggler />
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-[#1999f5] focus:outline-none"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#2a4a61] px-4 pb-4">
          <ul className="flex flex-col font-semibold pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`block py-3 border-b border-[#9CD5FF]/20 duration-100 ${
                    isActive(link.href)
                      ? "text-white border-l-2 border-l-[#9CD5FF] pl-2"
                      : "hover:text-white hover:pl-2"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
