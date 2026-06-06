"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function InteractionActions({ comment, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const getToken = async () => {
    const res = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data?.token;
  };

  const handleDeleteConfirm = async () => {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/comments/${comment._id}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      },
    );
    if (res.ok) {
      onDelete(comment._id?.toString());
      toast.success("Comment deleted!");
    } else {
      toast.error("Failed to delete.");
    }
    setDeleteModal(false);
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
      toast.success("Comment updated!");
    } else {
      toast.error("Failed to update.");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />

      {editingId === comment._id?.toString() ? (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              Edit Comment
            </h3>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-300"
              rows={4}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600"
              >
                Update Comment
              </button>
            </div>
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
            onClick={() => setDeleteModal(true)}
            className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-full font-semibold"
          >
            <FaTrash /> Delete
          </button>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-lg">
                🗑️
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Delete comment permanently?
              </h3>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
