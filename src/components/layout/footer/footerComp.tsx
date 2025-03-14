"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInFromLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" },
  }),
};

export default function FooterComp() {
  return (
    <div>
      <div className="relative w-full h-auto p-10 bg-purple-300 overflow-hidden font-gandom">
        {/* افکت‌های بک‌گراند */}
        <div className="absolute top-[-150px] left-[-200px] w-[500px] h-[500px] bg-gradient-to-br from-[#f3e8ff] via-[#f7d1ff] to-[#f8f9ff] rounded-full opacity-40 z-0"></div>
        <div className="absolute bottom-[-150px] right-[-200px] w-[500px] h-[500px] bg-gradient-to-br from-[#f3e8ff] via-[#f7d1ff] to-[#f8f9ff] rounded-full opacity-40 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20 text-right">
          <motion.div
            variants={fadeInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            custom={0}
            className="z-10"
          >
            {/* نماد */}
          </motion.div>

          <motion.div
            variants={fadeInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            custom={1}
            className="flex flex-col items-end gap-3 z-10"
          >
            <h3 className="text-lg md:text-xl font-semibold">دسته‌بندی‌ها</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/boy">
                  <span className="hover:text-gray-700 font-bold">پسرانه</span>
                </Link>
              </li>
              <li>
                <Link href="/girl">
                  <span className="hover:text-gray-700 font-bold">دخترانه</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            custom={2}
            className="flex flex-col items-end gap-3 z-10"
          >
            <h3 className="text-lg md:text-xl font-semibold">لینک‌های مفید</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact-us">
                  <span className="hover:text-gray-700 font-bold">
                    تماس با ما
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                  <span className="hover:text-gray-700 font-bold">
                    درباره ما
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/newProduct">
                  <span className="hover:text-gray-700 font-bold">
                    جدیدترین محصولات
                  </span>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            custom={3}
            className="flex flex-col items-end gap-4 z-10"
          >
            <h2 className="font-bold text-xl md:text-2xl opacity-90">
              ارتباط با شادینا
            </h2>

            <div className="flex items-center gap-2">
              <Image
                src="/img/location.png"
                alt="Location"
                width={30}
                height={30}
                className="z-10"
              />
              <span className="font-bold opacity-90 z-10">
                کاشمر، بین مدرس ۲-۴
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/img/instagram.png"
                alt="Instagram"
                width={30}
                height={30}
                className="z-10"
              />
              <span className="font-bold opacity-90 z-10">shadina_shop1</span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/img/call.png"
                alt="Call"
                width={30}
                height={30}
                className="z-10"
              />
              <span className="font-bold opacity-90 z-10">0905 186 7829</span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/img/email.png"
                alt="Email"
                width={30}
                height={30}
                className="z-10"
              />
              <span className="font-bold opacity-90 z-10">
                shadina_shop1@gmail.com
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
