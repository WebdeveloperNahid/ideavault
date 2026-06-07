"use client";

import React, { useState } from "react";

const SearchBar = ({ onSearch, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  const handleCategorySubmit = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (onCategoryChange) onCategoryChange(selectedCategory);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-6 ">
      <div className="text-center pb-5 space-y-2">
      <h1 className="text-3xl font-bold text-[#3a3939ea]">Discover Ideas that Inspire You</h1>
      <p className="text-[#14141498]">Explore, filter, and find creative ideas shared by the community</p>

      </div>
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 w-full"
      >
        {/* --- সার্চ ইনপুট এবং বাটন কন্টেইনার --- */}
        <div className="flex items-center flex-1 w-full border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition duration-200">
          <input
            type="text"
            placeholder="Search ideas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 text-gray-700 outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-[#1A56DB] hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 transition duration-200"
          >
            Search
          </button>
        </div>

        {/* --- ক্যাটাগরি ড্রপডাউন --- */}
        <div className="w-full sm:w-auto">
          <select
            value={category}
            onChange={handleCategorySubmit}
            className="w-full sm:w-auto px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm outline-none text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="all">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Health">Health</option>
            <option value="AI">AI</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Environment">Environment</option>
            <option value="Social Impact">Social Impact</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
