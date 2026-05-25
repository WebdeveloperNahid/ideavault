export const fetchIdeas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/ideas`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data || [];
};



export const fetchHomeData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/home`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data || [];
};
