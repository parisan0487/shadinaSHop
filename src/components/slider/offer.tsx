"use client";

import { Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  _id: string;
  slug: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  images: string[];
}

export default function Offer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products/category/offer");
        const data = await response.json();
        console.log("محصولات دریافت‌شده:", data);
        setProducts(data);
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
      }
    };

    fetchProducts();
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={3}
      effect="coverflow"
      grabCursor={true}
      autoplay={{ delay: 3000 }}
      loop={true}
      spaceBetween={50}
      breakpoints={{
        368: { slidesPerView: 2, spaceBetween: 270 },
        375: { slidesPerView: 1, spaceBetween: 110 },
        397: { slidesPerView: 2, spaceBetween: 205 },
        470: { slidesPerView: 2, spaceBetween: 170 },
        525: { slidesPerView: 2, spaceBetween: 100 },
        575: { slidesPerView: 2, spaceBetween: 55 },
        650: { slidesPerView: 2, spaceBetween: 5 },
        700: { slidesPerView: 3, spaceBetween: 200 },
        820: { slidesPerView: 3, spaceBetween: 60 },
        890: { slidesPerView: 3, spaceBetween: 20 },
        940: { slidesPerView: 4, spaceBetween: 180 },
        1060: { slidesPerView: 4, spaceBetween: 90 },
        1230: { slidesPerView: 4, spaceBetween: 80 },
        1310: { slidesPerView: 4, spaceBetween: 70 },
        // 1310: { slidesPerView: 3, spaceBetween: 30 },
      }}
      className="w-[90%] overflow-hidden"
      id="swiper-offer"
    >
      {products.map((product) => (
        <SwiperSlide
          key={product.slug}
          className="flex flex-col items-center relative -z-10"
        >
          <div
            className="rounded-[12px] w-[14rem] h-[25rem] bg-gradient-to-br from-[#f0f0f0] to-[#cacaca] shadow-[7px_7px_14px_#5a5a5a,-7px_-7px_14px_#ffffff] flex flex-col relative group"
            id="widthPro"
          >
            <Link
              href={`/products/${product.id}-${product.slug}`}
              className="block"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={150}
                height={150}
                className="rounded-md w-64 h-72 transition-all duration-300 group-hover:scale-105"
                id="imagePro"
              />
            </Link>

            <HeartIcon className="absolute top-2 right-2 w-8 h-8 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-red-400 transition-all duration-300" />

            <p
              className="mt-1 text-gray-700 font-gandom text-lg font-bold text-center"
              id="namePro"
            >
              {product.name}
            </p>

            <div className="relative flex items-center justify-end pr-4 line-through opacity-50 mt-2">
              <p className="font-gandom text-black font-bold" dir="rtl">
                {`${product.price.toLocaleString("fa-IR")} تومان`}
              </p>
              <span className="ml-2 inline-block w-4 h-4 rounded bg-purple-900 transition-all duration-600 group">
                <XMarkIcon className="w-full h-full text-white stroke-2 transition-all duration-600 group-hover:stroke-purple-500" />
              </span>
            </div>

            <div className="relative flex items-center justify-end pr-4">
              <p className="font-gandom text-black font-bold" dir="rtl">
                {`${product.discount.toLocaleString("fa-IR")} تومان`}
              </p>
              <span className="ml-2 inline-block w-4 h-4 rounded bg-purple-900 transition-all duration-600 group">
                <CheckIcon className="w-full h-full text-white stroke-2 transition-all duration-600 group-hover:stroke-purple-500" />
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
