"use client";

import { useState } from "react";
// import InteractionActions from "@/components/InteractionActions";

export default function InteractionsList({ initialComments }) {
  const [comments, setComments] = useState(initialComments);

  const handleDelete = (deletedId) => {
    setComments((prev) => prev.filter((c) => c._id !== deletedId));
  };

  const handleEdit = (editedId, newText) => {
    setComments((prev) =>
      prev.map((c) => (c._id === editedId ? { ...c, text: newText } : c))
    );
  };

  if (comments.length === 0) {
    return <p className="text-slate-400 text-sm">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-gray-50 border border-gray-300 rounded-xl p-5"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-sky-500">{comment.userName}</h3>
              <p className="mt-2 text-gray-600 text-sm">{comment.text}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
            <InteractionsList
              comment={comment}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      ))}
    </div>
  );
}