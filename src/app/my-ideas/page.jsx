"use client";

import { useEffect, useState } from "react";
import IdeaCard from "@/Components/IdeaCard";

const CATEGORIES = ["Tech","Health","AI","Education","Finance","Environment","Social Impact","E-Commerce","Entertainment","Other"];

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
      }
    );
    if (res.ok) {
      setIdeas((prev) => prev.filter((i) => i._id?.toString() !== ideaId?.toString()));
    }
  };

  // Edit modal খোলো
  const handleEdit = (ideaId) => {
    const idea = ideas.find((i) => i._id === ideaId);
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
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/ideas/${editingIdea}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );
    if (res.ok) {
      setIdeas((prev) =>
        prev.map((i) =>
          i._id === editingIdea
            ? {
                ...i,
                ideaTitle: form.title,
                shortDescription: form.shortDesc,
                detailedDescription: form.detailedDesc,
                category: form.category,
                imageURL: form.imageUrl,
                targetAudience: form.targetAudience,
                problemStatement: form.problemStatement,
                proposedSolution: form.proposedSolution,
              }
            : i
        )
      );
      setEditingIdea(null);
    }
    setSaving(false);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
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
      {editingIdea && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Edit Idea</h2>
              <button
                onClick={() => setEditingIdea(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >×</button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Idea Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className={inputCls}
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-700">Image URL</label>
                  <input
                    value={form.imageUrl}
                    onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Short Description</label>
                <textarea
                  rows={2}
                  value={form.shortDesc}
                  onChange={(e) => setForm((f) => ({ ...f, shortDesc: e.target.value }))}
                  className={inputCls + " resize-none"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Detailed Description</label>
                <textarea
                  rows={3}
                  value={form.detailedDesc}
                  onChange={(e) => setForm((f) => ({ ...f, detailedDesc: e.target.value }))}
                  className={inputCls + " resize-none"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">Target Audience</label>
                <input
                  value={form.targetAudience}
                  onChange={(e) => setForm((f) => ({ ...f, targetAudience: e.target.value }))}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-700">Problem Statement</label>
                  <textarea
                    rows={3}
                    value={form.problemStatement}
                    onChange={(e) => setForm((f) => ({ ...f, problemStatement: e.target.value }))}
                    className={inputCls + " resize-none"}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-700">Proposed Solution</label>
                  <textarea
                    rows={3}
                    value={form.proposedSolution}
                    onChange={(e) => setForm((f) => ({ ...f, proposedSolution: e.target.value }))}
                    className={inputCls + " resize-none"}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingIdea(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 disabled:opacity-60 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}