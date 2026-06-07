export const fetchIdeas = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/ideas`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("fetchIdeas failed:", res.status, await res.text());
      return [];
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("fetchIdeas error:", error);
    return [];
  }
};

export const fetchHomeData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/home`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("fetchHomeData failed:", res.status, await res.text());
      return [];
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("fetchHomeData error:", error);
    return [];
  }
};