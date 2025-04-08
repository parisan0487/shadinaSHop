"use client";

import { useCart } from "../../hooks/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import NavHead from "../layout/heading/navHead";
import Stepper from "../slider/stepper";
import Loading from "@/app/loading";
import Link from "next/link";
import FooterComp from "../layout/footer/footerComp";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface Variant {
  color: string;
  size: string;
}

interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

const toPersianDigits = (num: number | string) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function BasketComp() {
  const { data: cart } = useCart() as { data: Cart };
  const isLoading = false;
  const isError = false;

  const queryClient = useQueryClient();

  const updateCartMutation = useMutation({
    mutationFn: async ({
      productId,
      action,
      quantity,
      color,
      size,
    }: {
      productId: string;
      action: string;
      quantity: number;
      color: string;
      size: string;
    }) => {
      const token = localStorage.getItem("token");
      if (!cart || cart.items.length === 0) {
        return <p>سبد خرید شما خالی است</p>;
      }

      if (action === "remove" && quantity === 1) {
        await axios.delete(
          `https://shadback-production.up.railway.app/api/cart/remove/${productId}?color=${color}&size=${size}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        const updatedQuantity = action === "add" ? quantity + 1 : quantity - 1;

        if (updatedQuantity === 0) {
          await axios.delete(
            `https://shadback-production.up.railway.app/api/cart/remove/${productId}?color=${color}&size=${size}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } else {
          await axios.post(
            `https://shadback-production.up.railway.app/api/cart/add`,
            {
              productId,
              quantity: action === "add" ? 1 : -1,
              color,
              size,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (variables.action === "add") {
        toast.success("محصول شما با موفقیت اضافه شد");
      } else if (variables.action === "remove") {
        toast.success("محصول شما با موفقیت حذف شد");
      }
    },
    onError: () => {
      toast.error("مشکلی به وجود آمد");
    },
  });

  const codeClick = () => {
    toast.info("کد تخفیف وارد شده معتبر نیست");
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-xl text-red-500">خطا در دریافت سبد خرید</p>
    );
  if (!cart || cart.items.length === 0)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in font-gandom">
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 p-8 rounded-3xl shadow-2xl w-[32rem] text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            شما هیچ محصولی به سبد خرید اضافه نکردید
          </h2>
          <Link href="/">
            <button className="bg-purple-700 text-white px-6 mt-8 py-2 rounded-full font-semibold hover:bg-purple-800 transition-all duration-300">
              بازگشت به صفحه اصلی
            </button>
          </Link>
        </div>
      </div>
    );

  const totalPrice = cart.items.reduce((total: number, item: CartItem) => {
    if (item.product && item.product.price) {
      return total + item.product.price * item.quantity;
    }
    return total;
  }, 0);

  return (
    <>
      <div className="min-h-screen p-8 bg-gradient-to-r from-purple-200 to-pink-100  font-gandom overflow-hidden">
        <NavHead bgColor="bg-gradient-to-br from-[#fefeff] via-[#f7d1ff] to-[#f8f9ff] backdrop-blur-[10px]" />
        <div className="h-8"></div>
        <Stepper currentStep={1} />
        <div className="flex" id="topDivPay">
          <div
            className="w-1/3 bg-white p-6 rounded-lg shadow-lg h-[28rem] text-end divPay"
            id="payment-details"
          >
            <h3 className="text-2xl font-bold  mb-4">جزئیات پرداخت</h3>

            <div className="mb-6">
              <p className="text-lg ">
                مبلغ کل: {toPersianDigits(totalPrice)} تومان
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="discountCode"
                className="block text-sm text-purple-600 mb-2"
              >
                کد تخفیف
              </label>
              <div className="flex">
                <button
                  className="bg-red-700 w-20 rounded-lg"
                  onClick={codeClick}
                >
                  اعمال کد
                </button>
                <input
                  id="discountCode"
                  type="text"
                  className="w-full p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <span className="flex w-auto h-1 bg-gray-100"></span>
            <span className="flex w-auto h-1 bg-gray-100 mt-2 mb-4"></span>

            <div className="mb-6">
              <p className="text-lg ">
                مبلغ قابل پرداخت: {toPersianDigits(totalPrice)} تومان
              </p>
            </div>

            <Link href="/basket/chckout">
              <div className="text-center">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-purple-700 w-full checkout-button">
                  ادامه مراحل خرید
                </button>
              </div>
            </Link>
          </div>

          <div className="w-2/3 pl-8" id="product-details">
            <div className="space-y-8 mb-[50px]">
              {cart.items.map((item: CartItem) => (
                <div
                  key={`${item.product?._id}-${item.variant?.color}-${item.variant?.size}`}
                  className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 product-detail"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateCartMutation.mutate({
                            productId: item.product._id,
                            action: "remove",
                            quantity: item.quantity,
                            color: item.variant.color,
                            size: item.variant.size,
                          })
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600"
                        disabled={updateCartMutation.isPending}
                      >
                        -
                      </button>
                      <p className="text-2xl  w-8 h-8 bg-gray-100 border-black rounded-lg text-center">
                        {toPersianDigits(item.quantity)}
                      </p>
                      <button
                        onClick={() =>
                          updateCartMutation.mutate({
                            productId: item.product._id,
                            action: "add",
                            quantity: item.quantity,
                            color: item.variant.color,
                            size: item.variant.size,
                          })
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600"
                        disabled={updateCartMutation.isPending}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className=" text-end">
                      <h3 className="text-lg font-gandom ">
                        {item.product?.name || "نام محصول در دسترس نیست"}
                      </h3>
                      <p className="text-sm text-purple-600">
                        {toPersianDigits(item.product?.price ?? 0)} تومان
                      </p>
                      <p className="text-sm text-purple-600">
                        تعداد: {toPersianDigits(item.quantity)}
                      </p>
                    </div>
                    <Image
                      src={
                        item.product?.images[0] || "/path/to/default/image.jpg"
                      }
                      alt={item.product?.name || "تصویر محصول"}
                      width={80}
                      height={60}
                      className="rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
}
