import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../component/Navbar";
import Footer from "@/component/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault",
  description: "IdeaVault – Startup Idea Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
     
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content transition-colors duration-300">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar></Navbar>
        <main className="flex-1">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
