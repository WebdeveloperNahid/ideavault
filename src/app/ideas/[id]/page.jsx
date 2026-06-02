import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const fetchIdeasDetails = async (id, token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/ideas/${id}`, {
   headers: {
     authorization: `Bearer ${token}`|| "",
   }
  });


  const data = await res.json();
  return data || {};
};

const IdeasDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(token);
  const idea = await fetchIdeasDetails(id, token);

  const {
    title,
    ideaTitle,
    shortDescription,
    detailedDescription,
    category,
    imageURL,
    targetAudience,
    problemStatement,
  } = idea;

  const displayTitle = ideaTitle || title;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-14">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        {/* ── Hero Image ── */}
        <div className="relative h-64 sm:h-[320px] overflow-hidden group">
          {imageURL && (
            <img
              src={imageURL}
              alt={displayTitle}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Category badge */}
          {category && (
            <span className="absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full shadow">
              {category}
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="px-6 sm:px-10 py-8">
          {/* Title */}
          {displayTitle && (
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 leading-snug tracking-tight mb-2">
              {displayTitle}
            </h1>
          )}

          {/* Short Description */}
          {shortDescription && (
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-6 max-w-xl">
              {shortDescription}
            </p>
          )}

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-6" />

          {/* Detailed Description */}
          {detailedDescription && (
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-sky-500 mb-2">
                Overview
              </p>
              <p className="text-sm text-slate-600 leading-[1.9]">
                {detailedDescription}
              </p>
            </div>
          )}

          {/* Two-col info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Audience */}
            {targetAudience && (
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-5">
                <span className="text-xl mb-2 block">🎯</span>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-sky-500 mb-1">
                  Target Audience
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {targetAudience}
                </p>
              </div>
            )}

            {/* Problem Statement */}
            {problemStatement && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                <span className="text-xl mb-2 block">⚡</span>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-1">
                  Problem Statement
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {problemStatement}
                </p>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default IdeasDetailsPage;
