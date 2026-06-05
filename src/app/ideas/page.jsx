import IdeaCard from "@/Components/IdeaCard";
import { fetchIdeas } from "@/lib/ideasapi/data";

export default async function IdeasPage() {
  const ideas = await fetchIdeas();

  return (
    <>
      <div>Filter section</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
        {ideas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </>
  );
}
