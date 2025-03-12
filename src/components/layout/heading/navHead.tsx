"use client";
import Link from "next/link";
import Icons from "./headIcon";
import Image from "next/image";
import { FaSnowflake, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

interface NavHeadProps {
  bgColor?: string;
}

export default function NavHead({ bgColor = "bg-white/30" }: NavHeadProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="font-gandom">
      <nav
        className={`flex justify-between items-center ${bgColor} backdrop-blur-[10px] rounded-2xl p-4`}
        id="icon"
      >
        <div className="flex">
          <Icons />
        </div>

        <div
          className={`justify-center items-center transition-transform duration-500 hidden`}
          id="check"
          onClick={handleMenu}
        >
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox" className="toggle cursor-pointer relative">
            <div className="bar bar--top w-8"></div>
            <div className="bar bar--middle w-8 h-1"></div>
            <div className="bar bar--bottom w-8 h-1"></div>
          </label>
        </div>

        <ul className="flex space-x-6 text-gray-700 text-lg" id="menue">
          <Link href="/contact-us">
            <li className="relative group">
              <span className="relative inline-block group-hover:text-purple-700 transition-all duration-500 font-bold text-lg">
                تماس باما
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
              </span>
            </li>
          </Link>
          <Link href="/about-us">
            <li className="relative group">
              <span className="relative inline-block group-hover:text-purple-700 transition-all duration-500 font-bold text-lg">
                درباره ما
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
              </span>
            </li>
          </Link>
          <Link href="/newProduct">
            <li className="relative group">
              <span className="relative inline-block group-hover:text-purple-700 transition-all duration-500 font-bold text-lg">
                جدیدترین محصولات
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform "></span>
              </span>
            </li>
          </Link>

          <li className="relative group">
            <span className="relative inline-block cursor-pointer group-hover:text-purple-700 transition-all duration-300 font-bold text-lg">
              پسرانه
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
            </span>

            <ul
              className="absolute right-0 mt-2 w-44 bg-white/30 backdrop-blur-lg shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 text-right border border-gray-200"
              dir="rtl"
            >
              <Link href="/boy">
                <li className="relative group/submenu">
                  <span className="flex items-center px-5 py-3 hover:bg-purple-100 cursor-pointer rounded-t-lg text-gray-800 font-semibold transition-all duration-300">
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
                    زمستانی
                    <FaSnowflake className="mr-2 text-slate-400" />
                  </span>
                </li>
                <li className="relative group/submenu">
                  <span className="flex items-center px-5 py-3 hover:bg-purple-100 cursor-pointer text-gray-800 font-semibold transition-all duration-300 rounded-b-lg">
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
                    تابستانی <FaSun className="mr-2 text-yellow-500" />
                  </span>
                </li>
              </Link>
            </ul>
          </li>

          <li className="relative group">
            <span className="relative inline-block cursor-pointer group-hover:text-purple-700 transition-all duration-300 font-bold text-lg">
              دخترانه
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
            </span>

            <ul
              className="absolute right-0 mt-2 w-44 bg-white/30 backdrop-blur-lg shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 text-right border border-gray-200"
              dir="rtl"
            >
              <Link href="/girl">
                <li className="relative group/submenu">
                  <span className="flex items-center px-5 py-3 hover:bg-purple-100 cursor-pointer rounded-t-lg text-gray-800 font-semibold transition-all duration-300">
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
                    زمستانی
                    <FaSnowflake className="mr-2 text-slate-400" />
                  </span>
                </li>
                <li className="relative group/submenu">
                  <span className="flex items-center px-5 py-3 hover:bg-purple-100 cursor-pointer text-gray-800 font-semibold transition-all duration-300 rounded-b-lg">
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
                    تابستانی <FaSun className="mr-2 text-yellow-500" />
                  </span>
                </li>
              </Link>
            </ul>
          </li>
        </ul>

        <Link href="/">
          <Image
            src="/img/shadina.png"
            alt="Shopping Character"
            width={150}
            height={150}
            className="opacity-90 m-3"
          />
        </Link>
      </nav>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 text-end flex justify-end">
          <div className="w-80 bg-white/50 shadow-lg rounded-lg p-5 fixed right-0 top-0 h-full backdrop-blur-lg flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <button
                className="text-red-600 text-3xl hover:scale-110 transition-all duration-300 mt-[15px]"
                onClick={handleClose}
              >
                ✖
              </button>
              <Link href="/">
                <Image
                  src="/img/shadina.png"
                  alt="Shopping Character"
                  width={150}
                  height={150}
                  className="opacity-90 m-3"
                />
              </Link>
            </div>

            <ul className=" text-gray-800 text-lg grid gap-5">
              <span className="flex w-auto h-1 bg-slate-500"></span>
              <span className="flex w-auto h-1 bg-slate-500"></span>

              <Link href="/contact-us">
                <li className="relative group cursor-pointer ">
                  <span className="inline-block group-hover:text-purple-700 transition-all duration-500 font-bold">
                    تماس با ما
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                  </span>
                </li>
              </Link>

              <Link href="/about-us">
                <li className="relative group cursor-pointer">
                  <span className="inline-block group-hover:text-purple-700 transition-all duration-500 font-bold">
                    درباره ما
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                  </span>
                </li>
              </Link>

              <Link href="/newProduct">
                <li className="relative group cursor-pointer">
                  <span className="inline-block group-hover:text-purple-700 transition-all duration-500 font-bold">
                    جدیدترین محصولات
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                  </span>
                </li>
              </Link>

              <li className="relative group cursor-pointer">
                <span className="inline-block group-hover:text-purple-700 transition-all duration-500 font-bold">
                  پسرانه
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                </span>

                <ul className="absolute right-28 mt-1 h-[106px] w-44 bg-white/10 backdrop-blur-lg shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 text-right border border-gray-200">
                  <Link href="/boy">
                    <li className="flex ml-10 items-center px-5 py-3 hover:bg-purple-100 cursor-pointer rounded-t-lg text-gray-800 font-semibold transition-all duration-300">
                      <FaSnowflake className="mr-2 text-slate-400" />
                      زمستانی
                    </li>
                  </Link>
                  <Link href="/boy">
                    <li className="flex items-center ml-10 px-5 py-3 hover:bg-purple-100 cursor-pointer text-gray-800 font-semibold transition-all duration-300 rounded-b-lg">
                      <FaSun className="mr-2 text-yellow-500" />
                      تابستانی
                      <span className="absolute bottom-12 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
                    </li>
                  </Link>
                </ul>
              </li>

              <li className="relative group cursor-pointer">
                <span className="inline-block group-hover:text-purple-700 transition-all duration-500 font-bold">
                  دخترانه
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                </span>

                <ul className="absolute right-28 h-[106px] mt-1 w-44 bg-white/10 backdrop-blur-lg shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 text-right border border-gray-200">
                  <Link href="/girl">
                    <li className="flex items-center ml-12 px-5 py-3 hover:bg-purple-100 cursor-pointer rounded-t-lg text-gray-800 font-semibold transition-all duration-300">
                      <FaSnowflake className="mr-2 text-slate-400" />
                      زمستانی
                    </li>
                  </Link>
                  <Link href="/girl">
                    <li className="flex items-center ml-12 px-5 py-3 hover:bg-purple-100 cursor-pointer text-gray-800 font-semibold transition-all duration-300 rounded-b-lg">
                      <FaSun className="mr-2 text-yellow-500" />
                      تابستانی
                      <span className="absolute bottom-12 w-0 h-0.5 bg-purple-700 transition-all duration-500 group-hover:w-full group-hover:left-0 transform"></span>
                    </li>
                  </Link>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
