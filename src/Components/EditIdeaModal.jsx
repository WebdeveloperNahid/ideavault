"use client";

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

export default function EditIdeaModal({
  isOpen,
  form,
  setForm,
  onClose,
  onSave,
  saving,
}) {
  if (!isOpen) return null;

  const inputCls =
    "w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Edit Idea</h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">
              Idea Title
            </label>

            <input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700">
                Category
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700">
                Image URL
              </label>

              <input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">
              Short Description
            </label>

            <textarea
              rows={2}
              value={form.shortDesc}
              onChange={(e) =>
                setForm((f) => ({ ...f, shortDesc: e.target.value }))
              }
              className={inputCls + " resize-none"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">
              Detailed Description
            </label>

            <textarea
              rows={3}
              value={form.detailedDesc}
              onChange={(e) =>
                setForm((f) => ({ ...f, detailedDesc: e.target.value }))
              }
              className={inputCls + " resize-none"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">
              Target Audience
            </label>

            <input
              value={form.targetAudience}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  targetAudience: e.target.value,
                }))
              }
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700">
                Problem Statement
              </label>

              <textarea
                rows={3}
                value={form.problemStatement}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    problemStatement: e.target.value,
                  }))
                }
                className={inputCls + " resize-none"}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700">
                Proposed Solution
              </label>

              <textarea
                rows={3}
                value={form.proposedSolution}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    proposedSolution: e.target.value,
                  }))
                }
                className={inputCls + " resize-none"}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 disabled:opacity-60 flex items-center gap-2"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}