"use client";

import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { StarIcon } from "@heroicons/react/24/outline";
import BoyBody from "../../slider/boyBody";
import Offer from "@/components/slider/offer";
import New from "../../slider/new";
import GirlBody from "../../slider/girlBody";
import Best from "../../slider/best";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function BodyComp() {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  const sectionRef4 = useRef(null);
  const isVisible5 = useInView(sectionRef1, { once: false, amount: 0.5 });
  const isVisible6 = useInView(sectionRef2, { once: false, amount: 0.5 });
  const isVisible7 = useInView(sectionRef3, { once: false, amount: 0.5 });
  const isVisible8 = useInView(sectionRef4, { once: false, amount: 0.5 });

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible1(true);
        } else {
          setIsVisible1(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef1.current) {
      observer1.observe(sectionRef1.current);
    }

    const observer2 = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible2(true);
        } else {
          setIsVisible2(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef2.current) {
      observer2.observe(sectionRef2.current);
    }

    const observer3 = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible3(true);
        } else {
          setIsVisible3(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef3.current) {
      observer3.observe(sectionRef3.current);
    }

    const observer4 = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible4(true);
        } else {
          setIsVisible4(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef4.current) {
      observer4.observe(sectionRef4.current);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[63rem] h-[32rem] mx-auto mb-8 p-8 rounded-2xl bg-gray-100 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff,8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)] relative overflow-hidden"
        id="hightDad"
      >
        <div className="loader">
          <StarIcon className="loader-svg" />
        </div>

        <div className="loader lod2" id="starTop">
          <StarIcon className="loader-svg" />
        </div>

        <p className="text-center font-gandom text-4xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 animate-pulse hover:scale-110 hover:rotate-3d transition-all duration-500 ease-in-out">
          پیشنهاد ویژه
        </p>

        <div className="flex gap-8 mt-[2rem] ml-6" id="offer">
          <Offer />
        </div>
      </motion.div>
      <div>
        <Image
          src="/img/ball.png"
          alt="Shopping"
          width={100}
          height={100}
          className="relative smooth-entry opacity-90 mr-52 mb-[-9rem] cursor-pointer transition-all duration-200 transform hover:scale-110"
        />
      </div>

      <div className="mt-32">
        <p
          ref={sectionRef1}
          className={`latest-products text-center mb-8 font-gandom text-4xl font-extrabold bg-clip-text text-purple-700 relative ${
            isVisible1 ? "animate-visible" : ""
          }`}
        >
          جدیدترین محصولات
        </p>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isVisible5 ? { y: -90, opacity: 1 } : {}}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: isVisible5 ? 0 : 2,
          }}
          className="mt-32"
        >
          <New />
        </motion.div>
      </div>

      <div>
        <p
          ref={sectionRef2}
          className={`latest-products text-center mb-8 font-gandom text-4xl font-extrabold bg-clip-text text-purple-700 relative ${
            isVisible2 ? "animate-visible" : ""
          }`}
        >
          پرفروش ترین ها
        </p>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isVisible6 ? { y: -90, opacity: 1 } : {}}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: isVisible6 ? 0 : 2,
          }}
          className="mt-32"
        >
          <Best />
        </motion.div>
      </div>

      <div>
        <Image
          src="/img/ball3.png"
          alt="Shopping"
          width={100}
          height={100}
          className="relative smooth-entry opacity-90 mr-52 mb-[-3rem] cursor-pointer transition-all duration-200 transform hover:scale-110"
        />
      </div>

      <div>
        <p
          ref={sectionRef3}
          className={`latest-products text-center mb-8 font-gandom text-4xl font-extrabold bg-clip-text text-purple-700 relative ${
            isVisible3 ? "animate-visible" : ""
          }`}
        >
          دخترانه
        </p>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isVisible7 ? { y: -90, opacity: 1 } : {}}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: isVisible7 ? 0 : 2,
          }}
          className="mt-32"
        >
          <GirlBody />
        </motion.div>
      </div>

      <div>
        <p
          ref={sectionRef4}
          className={`latest-products text-center mb-8 font-gandom text-4xl font-extrabold bg-clip-text text-purple-700 relative ${
            isVisible4 ? "animate-visible" : ""
          }`}
        >
          پسرانه
        </p>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isVisible8 ? { y: -50, opacity: 1 } : {}}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: isVisible8 ? 0 : 5,
          }}
          className="mt-20"
        >
          <BoyBody />
        </motion.div>
      </div>
    </div>
  );
}
