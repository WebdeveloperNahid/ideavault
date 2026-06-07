"use client";

import { useState } from "react";
import InteractionActions from "./InteractionActions";
// import InteractionActions from "@/Components/InteractionActions";

export default function InteractionsList({ initialComments }) {
  const [comments, setComments] = useState(initialComments);

  const handleDelete = (deletedId) => {
    setComments((prev) => prev.filter((c) => c._id?.toString() !== deletedId));
  };

  const handleEdit = (editedId, newText) => {
    setComments((prev) =>
      prev.map((c) =>
        c._id?.toString() === editedId ? { ...c, text: newText } : c,
      ),
    );
  };


  return (
    <div>
      <h2 className="text-sky-400 mb-8 font-bold ">Total comments: <span className="text-green-500 font-bold"> {comments.length}</span> </h2>
      {comments.length=== 0 && (
        <p className="text-slate-400 text-3xl"> No Comments yet </p>
      )}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div
            key={comment._id ? comment._id.toString() : index}
            className="bg-gray-50 border border-gray-300 rounded-xl p-5"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-sky-500">
                  {comment.userName}
                </h3>
                <p className="mt-2 text-gray-600 text-sm">{comment.text}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleDateString("en-GB") +
                      ", " +
                      new Date(comment.createdAt).toLocaleTimeString("en-GB")
                    : ""}
                </p>
              </div>
              <InteractionActions
                comment={comment}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
