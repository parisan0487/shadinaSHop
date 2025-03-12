import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UpdateCartParams {
  productId: string;
  action: "add" | "remove";
}

const updateCartRequest = async ({ productId, action }: UpdateCartParams) => {
  const token = localStorage.getItem("token");
  const url =
    action === "add"
      ? "http://localhost:5000/api/cart/add"
      : "http://localhost:5000/api/cart/remove";
  const method = "POST";

  const { data } = await axios({
    url,
    method,
    data: { productId, quantity: 1 },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
}
