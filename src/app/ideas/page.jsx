import IdeaCard from "@/component/IdeaCard";


const fetchIdeas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/ideas`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data || [];
};

export default async function IdeasPage() {
  const ideas = await fetchIdeas();

  return (
    <>
      <div>Filter section</div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "24px",
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {ideas?.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </>
  );
}