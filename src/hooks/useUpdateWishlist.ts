import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

interface UpdateCartParams {
  productId: string;
}

const updateWishlist = async ({ productId }: UpdateCartParams) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post("/api/wishlist/add", { productId }, config);
  return data;
};

export function useUpdateWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWishlist,
    onSuccess: () => {
      toast.success("محصول با موفقیت به علاقه‌مندی‌ها اضافه شد!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err) => {
      toast.error("مشکلی در افزودن به علاقه‌مندی‌ها پیش آمد!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
      console.log(err);
    },
  });
}
