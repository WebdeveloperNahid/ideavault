"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/Components/SearchBar";
import IdeaCard from "@/Components/IdeaCard";

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const fetchIdeas = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/ideas?search=${search}&category=${category}`
    );

    const data = await res.json();
    setIdeas(data);
  };

  useEffect(() => {
    fetchIdeas();
  }, [search, category]);

  return (
    <>
      <SearchBar  onSearch={setSearch} onCategoryChange={setCategory}></SearchBar>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
        {ideas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </>
  );
}
