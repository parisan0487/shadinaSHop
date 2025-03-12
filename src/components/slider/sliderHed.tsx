"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const images = [
  "/img/clothes2.png",
  "/img/clothes3.png",
  "/img/clothes4.png",
  "/img/clothes5.png",
];

export default function SimpleImageSwiper() {
  return (
    <div className="w-full pl-28 -z-10 " id="clothesSlider">
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3500 }}
        loop={true}
        speed={1000}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="relative -z-10"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`Clothes ${index + 1}`}
              width={300}
              height={300}
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
