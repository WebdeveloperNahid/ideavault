"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function InteractionActions({ comment, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const getToken = async () => {
    const res = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data?.token;
  };

  const handleDelete = async () => {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/comments/${comment._id}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      },
    );
    if (res.ok) onDelete(comment._id?.toString());
  };

  const handleEditSave = async () => {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/comments/${comment._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: editText }),
      },
    );
    if (res.ok) {
      onEdit(comment._id?.toString(), editText);
      setEditingId(null);
    }
  };

  return (
    <div>
      {editingId === comment._id?.toString() ? (
        <div className="mt-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-300"
            rows={2}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEditSave}
              className="text-xs bg-sky-500 text-white px-3 py-1 rounded-full"
            >
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="text-xs text-slate-500 px-3 py-1 rounded-full border border-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => {
              setEditingId(comment._id?.toString());
              setEditText(comment.text);
            }}
            className="flex items-center gap-1 text-xs text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full font-semibold"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-full font-semibold"
          >
            <FaTrash /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
