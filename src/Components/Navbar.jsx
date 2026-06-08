"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/images/logo.png";

import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";

import { FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/add-idea", label: "Add Idea" },
  { href: "/my-ideas", label: "My Ideas" },
  { href: "/my-interactions", label: "My Interactions" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  const { data: session, isPending } = useSession();

  const handleLogOut = async () => {
    try {
      await signOut();
      closeMenu();
      setDropdownOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-gray-200 text-[#000000]">
      <div className="flex items-center justify-between h-16 px-4">
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
          {isPending ? (
            <div className="w-10 h-10 rounded-full bg-slate-300 animate-pulse" />
          ) : session && session.user ? (
            <div className="relative">
              {/* Avatar Button — click করলে open/close */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3 p-1 rounded-full transition-colors"
              >
                <Image
                  width={40}
                  height={40}
                  src={session.user?.image || "/images/avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                />
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-bold truncate max-w-[100px]">
                    {session.user?.name}
                  </p>
                  <p className="text-[10px] text-slate-500">User</p>
                </div>
              </button>

              {/* Dropdown — click এ toggle */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-sm">Welcome back!</p>
                    <p className="text-xs truncate text-slate-500">
                      {session.user?.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 text-sm flex items-center gap-3 transition-colors text-blue-500 font-bold hover:bg-blue-50"
                  >
                    <FaUser className="w-4 h-4" /> Profile
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left font-bold w-full"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="font-semibold hover:underline cursor-pointer"
              >
                Login
              </Link>
              <Link
                href="/registration"
                className="font-semibold hover:underline cursor-pointer"
              >
                Registration
              </Link>
            </>
          )}

          <ThemeToggler />
        </div>

        {/* Mobile Navbar Right */}
        <div className="flex md:hidden items-center gap-3">
          {!isPending && !session && (
            <>
              <Link
                href="/login"
                className="font-semibold text-sm hover:underline cursor-pointer"
              >
                Login
              </Link>
              <Link
                href="/registration"
                className="font-semibold text-sm hover:underline cursor-pointer"
              >
                Register
              </Link>
            </>
          )}

          {session && session.user && (
            <Image
              width={32}
              height={32}
              src={session.user?.image || "/images/avatar.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}

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

            {session && (
              <>
                <li>
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className={`block py-3 border-b border-[#9CD5FF]/20 duration-100 ${
                      isActive("/profile")
                        ? "text-white border-l-2 border-l-[#9CD5FF] pl-2"
                        : "hover:text-white hover:pl-2"
                    }`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left py-3 text-red-400 hover:text-red-300 font-semibold"
                  >
                    Log Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
