"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/usewishlist";
import axios from "axios";

type UserMenuState = boolean;
type SearchBoxState = boolean;
interface Product {
  id: number;
  _id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

export default function Icons() {
  const [userSrc, setUserSrc] = useState<string>("/img/user.png");
  const [bagSrc, setBagSrc] = useState<string>("/img/bag.png");
  const [heartSrc, setHeartSrc] = useState<string>("/img/heart.png");
  const [searchSrc, setSearchSrc] = useState<string>("/img/search.png");
  const [isSearchOpen, setIsSearchOpen] = useState<SearchBoxState>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<UserMenuState>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserMenu = (isOpen: boolean): void => {
    setIsUserMenuOpen(isOpen);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) return;

    try {
      const response = await axios.get<Product[]>(
        `http://localhost:5000/api/products/search?q=${value}`
      );
      setSearchResults(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("خطا در جستجو", error);
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("خروج موفقیت‌آمیز بود", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  return (
    <div className="flex items-center">
      <div
        className="relative"
        id="user"
        ref={userMenuRef}
        onMouseEnter={() => {
          setUserSrc("/img/user2.png");
          handleUserMenu(true);
        }}
        onMouseLeave={() => {
          setUserSrc("/img/user.png");
          handleUserMenu(false);
        }}
      >
        <Link href="/">
          <Image
            src={userSrc}
            alt="Shopping Character"
            width={25}
            height={25}
            className="opacity-90 m-3 cursor-pointer transition-all duration-200 transform hover:scale-110"
          />
        </Link>
        {isUserMenuOpen && (
          <div className="absolute top-12 w-36 text-lg backdrop-blur-3xl shadow-lg rounded-lg py-2 text-right border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 z-[9999]">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="flex flex-row-reverse items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                >
                  <span>پروفایل</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex flex-row-reverse items-center w-full px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 text-right"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 ml-2" />
                  <span>خروج</span>
                </button>
              </>
            ) : (
              <Link
                href="/register"
                className="flex flex-row-reverse items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
              >
                <span>ورود / ثبت نام</span>
              </Link>
            )}
          </div>
        )}
      </div>

      <Link href="/basket" className="relative" id="basket">
        <Image
          src={bagSrc}
          alt="Shopping Character"
          width={30}
          height={30}
          className="opacity-90 m-3 cursor-pointer transition-all duration-200 transform hover:scale-110"
          onMouseEnter={() => setBagSrc("/img/bag2.png")}
          onMouseLeave={() => setBagSrc("/img/bag.png")}
        />
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
          {cart?.items.length.toLocaleString("fa-IR") || 0}
        </span>
      </Link>

      <Link href="/lovely" className="relative" id="lovely">
        <Image
          src={heartSrc}
          alt="Shopping Character"
          width={30}
          height={30}
          className="opacity-90 m-3 cursor-pointer transition-all duration-200 transform hover:scale-110"
          onMouseEnter={() => setHeartSrc("/img/heart2.png")}
          onMouseLeave={() => setHeartSrc("/img/heart.png")}
        />
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
          {wishlist?.products?.length.toLocaleString("fa-IR") || 0}
        </span>
      </Link>

      <div className="flex items-center">
        <Image
          src={searchSrc}
          alt="Search"
          width={32}
          height={32}
          className="opacity-90 m-3 cursor-pointer transition-all duration-200 transform hover:scale-110"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div
          id="searchBox"
          className={`bg-white/75 backdrop-blur-lg scrollbar-hide rounded-lg font-gandom text-end fixed top-0 right-0 w-80 h-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50 p-4 overflow-y-auto ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full opacity-0"
          }`}
        >
          <button
            className="absolute top-4 left-4 text-gray-800"
            onClick={() => setIsSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold mb-4" id="searchH2">
            نتایج جستجو
          </h2>

          <input
            type="text"
            placeholder="...جستجو"
            className="w-full p-2 bg-white/50 border border-purple-400 rounded text-end focus:outline-none"
            id="searchInput"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="space-y-4 mt-4">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div key={product._id}>
                  <Link href={`/products/${product.id}-${product.slug}`}>
                    <div
                      key={product._id}
                      className="border-b pb-4 flex items-center space-x-2"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <span className="text-lg text-red-500">
                          قیمت: {product.price.toLocaleString("fa-IR")} تومان
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>محصولی یافت نشد</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
