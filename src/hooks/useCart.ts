import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const { data } = await axios.get("/api/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(data);
  return data;
};

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 0,
    refetchOnMount: true,
  });
}
