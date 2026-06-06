"use client";

import { useEffect, useState } from "react";
import IdeaCard from "@/Components/IdeaCard";
import toast, { Toaster } from "react-hot-toast";
import EditIdeaModal from "@/Components/EditIdeaModal";

const CATEGORIES = [
  "Tech",
  "Health",
  "AI",
  "Education",
  "Finance",
  "Environment",
  "Social Impact",
  "E-Commerce",
  "Entertainment",
  "Other",
];

export default function MyIdeasClient() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIdea, setEditingIdea] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const getToken = async () => {
    const res = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data?.token;
  };

  // My ideas fetch করো
  const fetchMyIdeas = async () => {
    setLoading(true);
    const token = await getToken();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/my-ideas`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setIdeas(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyIdeas();
  }, []);

  // Delete
  const handleDelete = async (ideaId) => {
    if (!confirm("Are you sure you want to delete this idea?")) return;
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/ideas/${ideaId}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      },
    );
    if (res.ok) {
      setIdeas((prev) =>
        prev.filter((i) => i._id?.toString() !== ideaId?.toString()),
      );
      toast.success("Idea deleted Successfully!");
    } else {
      toast.error("Failed to delete idea.");
    }
  };

  // Edit modal খোলো
  const handleEdit = (ideaId) => {
    const idea = ideas.find((i) => i._id?.toString() === ideaId?.toString());
    if (!idea) return;
    setEditingIdea(ideaId);
    setForm({
      title: idea.ideaTitle || "",
      shortDesc: idea.shortDescription || "",
      detailedDesc: idea.detailedDescription || "",
      category: idea.category || "",
      imageUrl: idea.imageURL || "",
      targetAudience: idea.targetAudience || "",
      problemStatement: idea.problemStatement || "",
      proposedSolution: idea.proposedSolution || "",
    });
  };

  // Save edit
  const handleSave = async () => {
    setSaving(true);

    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/ideas/${editingIdea}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ideaTitle: form.title,
            shortDescription: form.shortDesc,
            detailedDescription: form.detailedDesc,
            category: form.category,
            imageURL: form.imageUrl,
            targetAudience: form.targetAudience,
            problemStatement: form.problemStatement,
            proposedSolution: form.proposedSolution,
          }),
        },
      );

      const data = await res.json();

      console.log("PATCH STATUS:", res.status);
      console.log("PATCH RESPONSE:", data);

      if (!res.ok) {
        toast.error(data?.message || "Update failed");
        return;
      }

      toast.success("Idea updated successfully!");

      setEditingIdea(null);

      fetchMyIdeas();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-sky-500 mb-2">My Ideas</h1>
      <p className="text-slate-500 mb-8">Total: {ideas.length}</p>

      {ideas.length === 0 ? (
        <p className="text-slate-400 text-sm">No ideas submitted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
              showActions={true}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <EditIdeaModal
        isOpen={editingIdea}
        form={form}
        setForm={setForm}
        onClose={() => setEditingIdea(null)}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}
