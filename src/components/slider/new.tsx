"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { CheckIcon } from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

interface Product {
  id: number;
  _id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

export default function New() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products/category/new"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-[80rem] h-[25rem] mx-auto mb-8 p-8 rounded-2xl bg-gray-100 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff,8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)] relative overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        effect="coverflow"
        grabCursor={true}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={50}
        className="relative -z-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <Link href={`/products/${product.id}-${product.slug}`}>
              <div className="rounded-[12px] w-[14rem] h-[21rem] bg-gradient-to-br from-[#f0f0f0] to-[#cacaca] shadow-[7px_7px_14px_#5a5a5a,-7px_-7px_14px_#ffffff] flex flex-col relative group">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="rounded-md w-72 h-52 transition-all duration-300 group-hover:scale-105"
                />
                <HeartIcon className="absolute top-2 right-2 w-8 h-8 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-red-400 transition-all duration-300" />
                <p className="mt-4 text-gray-700 font-gandom text-lg font-bold text-center">
                  {product.name}
                </p>
                <p className="mt-1 font-gandom text-red-400 text-center">
                  {product.description}
                </p>
                <div className="relative flex items-center justify-end pr-4 mt-5">
                  <p className="font-gandom text-black font-bold" dir="rtl">
                    {`${product.price.toLocaleString("fa-IR")} تومان`}
                  </p>
                  <span className="ml-2 inline-block w-4 h-4 rounded bg-purple-900 transition-all duration-600 group">
                    <CheckIcon className="w-full h-full text-white stroke-2 transition-all duration-600 group-hover:stroke-purple-500" />
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
