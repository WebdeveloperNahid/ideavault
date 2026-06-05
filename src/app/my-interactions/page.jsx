
import InteractionsList from "@/Components/InteractionsLIst";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const MyInteractionsPage = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/my-comments`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const comments = await res.json();

   return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-sky-500 mb-2">My Interactions</h1>
      <p className="text-slate-500 mb-8">
        Total comments: {Array.isArray(comments) ? comments.length : 0}
      </p>
      <InteractionsList initialComments={Array.isArray(comments) ? comments : []} />
    </div>
  );
};

export default MyInteractionsPage;
