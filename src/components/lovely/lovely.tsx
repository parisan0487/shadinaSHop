"use client";
import { useWishlist } from "../../hooks/usewishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loading from "@/app/loading";
import Link from "next/link";
import NavHead from "../layout/heading/navHead";
import FooterComp from "../layout/footer/footerComp";

interface Product {
  _id: string;
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
}

const toPersianDigits = (num: number | string) => {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};

export default function LovelyComp() {
  const { data: wishlist, isLoading, isError } = useWishlist();
  const queryClient = useQueryClient();

  const removeWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://shadback-production.up.railway.app/api/wishlist/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("محصول با موفقیت حذف شد");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "مشکلی رخ داده است");
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-xl text-red-500">خطا در دریافت سبد خرید</p>
    );
  if (!wishlist || !wishlist.products || wishlist.products.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 p-8 rounded-3xl shadow-2xl w-[30rem] text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            شما هیچ محصولی به علاقه مندی ها اضافه نکردید
          </h2>
          <Link href="/">
            <button className="bg-purple-700 text-white px-6 mt-8 py-2 rounded-full font-semibold hover:bg-purple-800 transition-all duration-300">
              بازگشت به صفحه اصلی
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-8 bg-gradient-to-r from-purple-200 to-pink-100  font-gandom overflow-hidden">
        <NavHead bgColor="bg-gradient-to-br from-[#fefeff] via-[#f7d1ff] to-[#f8f9ff] backdrop-blur-[10px]" />

        <div className="flex justify-center items-center mt-20">
          <div className="w-2/3 pl-8 ">
            <div className="space-y-8 ">
              {(wishlist?.products ?? []).map((product: Product) => (
                <motion.div
                  key={product._id}
                  className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
                  id="lovely-details"
                >
                  <button
                    onClick={() => removeWishlistMutation.mutate(product._id)}
                    className={`bg-red-500 text-white px-4 py-2 mt-2 rounded ${
                      removeWishlistMutation.isPending &&
                      removeWishlistMutation.variables === product._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {removeWishlistMutation.isPending &&
                    removeWishlistMutation.variables === product._id
                      ? "در حال حذف..."
                      : "حذف"}
                  </button>

                  <p dir="rtl" className="text-purple-800">
                    {toPersianDigits(product.price)} تومان
                  </p>

                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <Link href={`/products/${product.id}-${product.slug}`}>
                    {product.images?.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={80}
                        height={60}
                      />
                    ) : (
                      <p>تصویر موجود نیست</p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
}
