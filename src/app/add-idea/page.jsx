"use client"
import { useState } from "react";
import { useRouter } from "next/navigation"; //  ঠিক করা হয়েছে
import toast, { Toaster } from "react-hot-toast";

const CATEGORIES = ["Tech", "Health", "AI", "Education", "Finance", "Environment", "Social Impact", "E-Commerce", "Entertainment", "Other"];

const INIT = {
  title: "",
  shortDesc: "",
  detailedDesc: "",
  category: "",
  imageUrl: "", // এই যে এখানে imageUrl স্টেট যোগ করা হয়েছে
  targetAudience: "",
  problemStatement: "",
  proposedSolution: "",
};

const useAuth = () => ({ isAuthenticated: true, user: { name: "Alex Johnson" } });

const saveIdea = async (data) => {
  await new Promise((r) => setTimeout(r, 1000));
  console.log("Saved:", data);
};

function Field({ label, required, error, hint, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>
        {label}
        {required && <span style={{ color: "#1999f5", marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {hint && !error && <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{hint}</p>}
      {error && <p style={{ margin: 0, fontSize: 12, color: "#ef4444", fontWeight: 500 }}>{error}</p>}
    </div>
  );
}

const inp = (err) => ({
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: `1.5px solid ${err ? "#ef4444" : "#e2e8f0"}`,
  fontSize: 14,
  color: "#1a1a2e",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color .2s",
});

const ta = (err) => ({ ...inp(err), resize: "vertical", lineHeight: 1.6 });

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter(); //  ঠিক করা হয়েছে

  if (!isAuthenticated) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, background: "#f0f9ff" }}>
      <div style={{ fontSize: 40, background: "#dbeafe", borderRadius: "50%", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>🔒</div>
      <h2 style={{ margin: 0, fontSize: 20, color: "#1a1a2e" }}>Sign in required</h2>
      <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>You must be logged in to submit an idea.</p>
      <button
        onClick={() => router.push("/login")} //  ঠিক করা হয়েছে
        style={{ marginTop: 8, padding: "10px 26px", borderRadius: 10, background: "#1999f5", color: "#fff", border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
      >
        Go to Login
      </button>
    </div>
  );
  return children;
}

function AddIdeaForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())             e.title             = "Idea title is required.";
    if (!form.shortDesc.trim())         e.shortDesc         = "Short description is required.";
    else if (form.shortDesc.length > 160) e.shortDesc       = "Max 160 characters.";
    if (!form.detailedDesc.trim())      e.detailedDesc      = "Detailed description is required.";
    if (!form.category)                 e.category          = "Please select a category.";
    if (!form.imageUrl.trim())          e.imageUrl          = "Image URL is required."; // ভ্যালিডেশন যোগ করা হয়েছে
    if (!form.targetAudience.trim())    e.targetAudience    = "Target audience is required.";
    if (!form.problemStatement.trim())  e.problemStatement  = "Problem statement is required.";
    if (!form.proposedSolution.trim())  e.proposedSolution  = "Proposed solution is required.";
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
      await saveIdea({ ...form, submittedBy: user?.name });
      setForm(INIT);
      setErrors({});
      toast.success("Idea submitted successfully!", {
        style: {
          background: "#1999f5",
          color: "#fff",
          fontWeight: 600,
          borderRadius: 12,
          padding: "14px 20px",
          fontSize: 14,
        },
        iconTheme: { primary: "#fff", secondary: "#1999f5" },
        duration: 4000,
      });
      setTimeout(() => router.push("/ideas"), 1500); 
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const focusStyle = `
    input:focus, textarea:focus, select:focus {
      border-color: #1999f5 !important;
      box-shadow: 0 0 0 3px rgba(25,153,245,0.15);
    }
    input::placeholder, textarea::placeholder { color: #cbd5e1; }
    select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%2394a3b8' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 13px center; }
    @keyframes spin { to { transform: rotate(360deg) } }
  `;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      <style>{focusStyle}</style>
      <Toaster position="top-right" />

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#1999f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💡</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1a1a2e" }}>Submit Your Idea</h1>
              <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>Share your startup idea with the community</p>
            </div>
          </div>
          <span style={{ background: "#eff8ff", color: "#1999f5", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20, border: "1px solid #bae6fd" }}>{user?.name}</span>
        </div>
        <div style={{ height: 3, background: "#e2e8f0" }}>
          <div style={{ height: "100%", width: "45%", background: "#1999f5", borderRadius: "0 2px 2px 0" }} />
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 24px 4rem" }}>

        <SectionLabel text="Basic Information" />
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 32 }}>

          <Field label="Idea Title" required error={errors.title}>
            <input type="text" placeholder="e.g. AI-powered meal planning for busy parents" value={form.title} onChange={set("title")} style={inp(errors.title)} />
          </Field>

          <Field label="Short Description" required error={errors.shortDesc} hint="Max 160 characters.">
            <div style={{ position: "relative" }}>
              <textarea rows={2} placeholder="One compelling sentence about your idea..." value={form.shortDesc} onChange={set("shortDesc")} style={{ ...ta(errors.shortDesc), paddingBottom: 28 }} />
              <span style={{ position: "absolute", bottom: 8, right: 12, fontSize: 11, color: form.shortDesc.length > 160 ? "#ef4444" : "#cbd5e1" }}>{form.shortDesc.length}/160</span>
            </div>
          </Field>

          <Field label="Detailed Description" required error={errors.detailedDesc}>
            <textarea rows={4} placeholder="Elaborate on your idea — the vision, opportunity, what makes it unique..." value={form.detailedDesc} onChange={set("detailedDesc")} style={ta(errors.detailedDesc)} />
          </Field>

          <Field label="Category" required error={errors.category}>
            <select value={form.category} onChange={set("category")} style={{ ...inp(errors.category), color: form.category ? "#1a1a2e" : "#cbd5e1" }}>
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          {/* ঠিক ক্যাটাগরির নিচে Image URL ফিল্ডটি যোগ করা হয়েছে */}
          <Field label="Image URL" required error={errors.imageUrl} hint="Provide a valid image link.">
            <input type="text" placeholder="e.g. https://example.com/image.jpg" value={form.imageUrl} onChange={set("imageUrl")} style={inp(errors.imageUrl)} />
          </Field>
        </div>

        <SectionLabel text="Idea Details" />
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 32 }}>

          <Field label="Target Audience" required error={errors.targetAudience} hint="Who will use or benefit from this?">
            <input type="text" placeholder="e.g. Small business owners aged 25–45" value={form.targetAudience} onChange={set("targetAudience")} style={inp(errors.targetAudience)} />
          </Field>

          <Field label="Problem Statement" required error={errors.problemStatement} hint="What pain point does your idea solve?">
            <textarea rows={3} placeholder="Describe the core problem clearly..." value={form.problemStatement} onChange={set("problemStatement")} style={ta(errors.problemStatement)} />
          </Field>

          <Field label="Proposed Solution" required error={errors.proposedSolution} hint="How does your idea address the problem?">
            <textarea rows={3} placeholder="Walk through your solution — technology, approach, key differentiators..." value={form.proposedSolution} onChange={set("proposedSolution")} style={ta(errors.proposedSolution)} />
          </Field>
        </div>

        {/* Submit bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
            Fields marked <span style={{ color: "#1999f5", fontWeight: 700 }}>*</span> are required
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => { setForm(INIT); setErrors({}); }}
              style={{ padding: "9px 18px", borderRadius: 10, background: "#fff", border: "1.5px solid #e2e8f0", color: "#64748b", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{ padding: "9px 24px", borderRadius: 10, background: submitting ? "#93c5fd" : "#1999f5", color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background .2s" }}
            >
              {submitting ? (
                <>
                  <span style={{ width: 13, height: 13, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />
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

function SectionLabel({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 10, borderBottom: "1.5px solid #e2e8f0" }}>
      <div style={{ width: 4, height: 16, background: "#1999f5", borderRadius: 4 }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", letterSpacing: ".01em" }}>{text}</span>
    </div>
  );
}

export default function AddIdeaPage() {
  return (
    <PrivateRoute>
      <AddIdeaForm />
    </PrivateRoute>
  );
}