// src/app/not-found.jsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-7xl font-bold text-red-500">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-400 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been removed.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}