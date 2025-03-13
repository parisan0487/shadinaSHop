import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchWishlist = async () => {
  const token = localStorage.getItem("token");
  if (!token) return { items: [] };
  const { data } = await axios.get("/api/wishlist", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export function useWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
    staleTime: 1000 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
