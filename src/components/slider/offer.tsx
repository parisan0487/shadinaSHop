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
        const response = await fetch(
          "http://localhost:5000/api/products/category/offer"
        );
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
      modules={[EffectCoverflow, Autoplay]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      spaceBetween={20}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      className="w-[90%] overflow-hidden"
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
