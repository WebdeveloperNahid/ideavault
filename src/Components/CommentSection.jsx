"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CommentSection({ ideaId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const currentUserId = session?.user?.id;

  // Hydration fix — client mount houyar age kisu render korbe na
  useEffect(() => {
    setMounted(true);
  }, []);

  const getToken = async () => {
    const res = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data?.token;
  };

  const fetchComments = async () => {
    if (!ideaId) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/comments/${ideaId}`,
    );
    const data = await res.json();
    setComments(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchComments();
  }, [ideaId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ideaId, text }),
    });
    const newComment = await res.json();
    setComments((prev) => [newComment, ...prev]);
    setText("");
    setLoading(false);
  };

  const handleDelete = async (commentId) => {
    const token = await getToken();
    await fetch(`${process.env.NEXT_PUBLIC_API_URI}/comments/${commentId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    setComments((prev) => prev.filter((c) => c._id?.toString() !== commentId));
  };

  const handleEditSave = async (commentId) => {
    const token = await getToken();
    await fetch(`${process.env.NEXT_PUBLIC_API_URI}/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: editText }),
    });
    setComments((prev) =>
      prev.map((c) =>
        c._id?.toString() === commentId ? { ...c, text: editText } : c,
      ),
    );
    setEditingId(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 pb-16">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">
        Comments ({comments.length})
      </h2>

      {mounted && !isPending && (
        <>
          {session ? (
            <div className="mb-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-sky-300"
                rows={3}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !text.trim()}
                className="mt-2 bg-sky-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-sky-600 disabled:opacity-50"
              >
                {loading ? "Posting..." : "Post Comment"}
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-400 mb-6">
              Login to post a comment.
            </p>
          )}
        </>
      )}

      {/* Comment list */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-slate-400">No comments yet.</p>
        )}
        {comments.map((comment, index) => (
          <div
            key={comment._id ? comment._id.toString() : index}
            className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-700">
                {comment.userName}
              </p>

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
                      onClick={() => handleEditSave(comment._id?.toString())}
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
                <p className="text-sm text-slate-600 mt-1">{comment.text}</p>
              )}

              <p className="text-xs text-slate-400 mt-2">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleDateString("en-GB") +
                    ", " +
                    new Date(comment.createdAt).toLocaleTimeString("en-GB")
                  : ""}
              </p>
            </div>

            {mounted && currentUserId === comment.userId && (
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
                  onClick={() => handleDelete(comment._id?.toString())}
                  className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-full font-semibold"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
