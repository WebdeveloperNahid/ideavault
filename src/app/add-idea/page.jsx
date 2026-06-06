"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const CATEGORIES = ["Tech","Health","AI","Education","Finance","Environment","Social Impact","E-Commerce","Entertainment","Other"];

const INIT = { title:"", shortDesc:"", detailedDesc:"", category:"", imageUrl:"", targetAudience:"", problemStatement:"", proposedSolution:"" };

function Field({ label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-slate-700">
        {label}{required && <span className="text-sky-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function AddIdeaForm() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: "" }));
  };

  const inputCls = (err) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${err ? "border-red-400" : "border-slate-200"}`;

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Required.";
    if (!form.shortDesc.trim()) e.shortDesc = "Required.";
    else if (form.shortDesc.length > 160) e.shortDesc = "Max 160 characters.";
    if (!form.detailedDesc.trim()) e.detailedDesc = "Required.";
    if (!form.category) e.category = "Please select a category.";
    if (!form.imageUrl.trim()) e.imageUrl = "Required.";
    if (!form.targetAudience.trim()) e.targetAudience = "Required.";
    if (!form.problemStatement.trim()) e.problemStatement = "Required.";
    if (!form.proposedSolution.trim()) e.proposedSolution = "Required.";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      toast.error("Please fix the errors below.");
      return;
    }
    setSubmitting(true);
    try {
      const tokenRes = await fetch("/api/auth/token", {
        method: "GET",
        credentials: "include",
      });
      const tokenData = await tokenRes.json();
      const token = tokenData?.token;

      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setForm(INIT);
      setErrors({});
      toast.success("Idea submitted successfully!");
      // setTimeout(() => router.push("/ideas"), 1500);
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-sky-50">
        <div className="text-4xl bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">🔒</div>
        <h2 className="text-xl font-bold text-slate-800">Sign in required</h2>
        <p className="text-sm text-slate-500">You must be logged in to submit an idea.</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-2 px-6 py-2.5 bg-sky-500 text-white rounded-lg font-semibold text-sm hover:bg-sky-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center text-lg">💡</div>
            <div>
              <h1 className="text-base font-bold text-slate-800">Submit Your Idea</h1>
              <p className="text-xs text-slate-400">Share your startup idea with the community</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-sky-500 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            {session?.user?.name}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-slate-100">
          <div className="h-full w-[45%] bg-sky-500 rounded-r" />
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">

        {/* Basic Information */}
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-sky-500 rounded inline-block" />
          Basic Information
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {/* Title — full width */}
          <Field label="Idea Title" required error={errors.title}>
            <input
              type="text"
              placeholder="e.g. AI-powered meal planning for busy parents"
              value={form.title}
              onChange={set("title")}
              className={inputCls(errors.title)}
            />
          </Field>

          {/* Category + Image URL — 2 column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category" required error={errors.category}>
              <select
                value={form.category}
                onChange={set("category")}
                className={inputCls(errors.category)}
              >
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            <Field label="Image URL" required error={errors.imageUrl} hint="Provide a valid image link.">
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={set("imageUrl")}
                className={inputCls(errors.imageUrl)}
              />
            </Field>
          </div>

          {/* Short Description */}
          <Field label="Short Description" required error={errors.shortDesc} hint="Max 160 characters.">
            <div className="relative">
              <textarea
                rows={2}
                placeholder="One compelling sentence about your idea..."
                value={form.shortDesc}
                onChange={set("shortDesc")}
                className={inputCls(errors.shortDesc) + " resize-none pb-6"}
              />
              <span className={`absolute bottom-2 right-3 text-[11px] ${form.shortDesc.length > 160 ? "text-red-400" : "text-slate-300"}`}>
                {form.shortDesc.length}/160
              </span>
            </div>
          </Field>

          {/* Detailed Description */}
          <Field label="Detailed Description" required error={errors.detailedDesc}>
            <textarea
              rows={4}
              placeholder="Elaborate on your idea — the vision, opportunity, what makes it unique..."
              value={form.detailedDesc}
              onChange={set("detailedDesc")}
              className={inputCls(errors.detailedDesc) + " resize-none"}
            />
          </Field>
        </div>

        {/* Idea Details */}
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-sky-500 rounded inline-block" />
          Idea Details
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {/* Target Audience — full width */}
          <Field label="Target Audience" required error={errors.targetAudience} hint="Who will use or benefit from this?">
            <input
              type="text"
              placeholder="e.g. Small business owners aged 25–45"
              value={form.targetAudience}
              onChange={set("targetAudience")}
              className={inputCls(errors.targetAudience)}
            />
          </Field>

          {/* Problem + Solution — 2 column on large, 1 on small */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Problem Statement" required error={errors.problemStatement} hint="What pain point does your idea solve?">
              <textarea
                rows={4}
                placeholder="Describe the core problem clearly..."
                value={form.problemStatement}
                onChange={set("problemStatement")}
                className={inputCls(errors.problemStatement) + " resize-none"}
              />
            </Field>

            <Field label="Proposed Solution" required error={errors.proposedSolution} hint="How does your idea address the problem?">
              <textarea
                rows={4}
                placeholder="Walk through your solution..."
                value={form.proposedSolution}
                onChange={set("proposedSolution")}
                className={inputCls(errors.proposedSolution) + " resize-none"}
              />
            </Field>
          </div>
        </div>

        {/* Submit bar */}
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4">
          <p className="text-xs text-slate-400">
            Fields marked <span className="text-sky-500 font-bold">*</span> are required
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setForm(INIT); setErrors({}); }}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50"
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-5 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 disabled:opacity-60 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : "Submit Idea →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AddIdeaPage() {
  return <AddIdeaForm />;
}