"use client";

import SimpleImageSwiper from "../../slider/sliderHed";
import Link from "next/link";
import NavHead from "@/components/layout/heading/navHead";
import { motion } from "framer-motion";

const HeaderComp = () => {
  return (
    <header className="relative w-full p-10 bg-gradient-to-br from-[#f3e8ff] via-[#f7d1ff] to-[#f8f9ff] overflow-hidden font-gandom">
      <div
        className="absolute top-[-150px] left-[-200px] w-[500px] h-[500px] bg-purple-300 rounded-full opacity-40"
        id="circleTop"
      ></div>

      <div className="absolute top-[50px] left-[-100px] w-[300px] h-[300px] bg-purple-200 rounded-full opacity-30 blur-[100px]"></div>

      <div
        className="absolute bottom-[-150px] right-[-200px] w-[500px] h-[500px] bg-purple-300 rounded-full opacity-40"
        id="circleButtom"
      ></div>

      <div className="absolute bottom-[50px] right-[-100px] w-[300px] h-[300px] bg-purple-200 rounded-full opacity-30 blur-[100px]"></div>

      <NavHead />

      <div className="mt-10 flex items-center justify-between" id="sliderHed">
        <div className="relative w-1/2">
          <SimpleImageSwiper />
        </div>
        <motion.div
          className="w-1/2 pr-10 text-right"
          id="text"
          initial={{ opacity: 0, x: -100, zIndex: -1 }}
          animate={{ opacity: 1, x: 0, zIndex: 45 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl font-extrabold text-purple-800 opacity-90"
            id="textH1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 90 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            !باشادینا شیک به نظر برسید
          </motion.h1>

          <motion.p
            className="mt-4 opacity-90 font-bold "
            id="textP"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 90 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            پوشاک با کیفیت، راحت و شیک برای کوچولوها با بهترین قیمت‌ها و طرح‌های
            جذاب
          </motion.p>

          <Link href="/shop">
            <motion.button
              className="mt-6 bg-purple-500 opacity-90 text-black hover:text-purple-500 px-6 py-3 rounded-full hover:bg-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
              id="textButton"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 90 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              مشاهده محصولات
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default HeaderComp;
