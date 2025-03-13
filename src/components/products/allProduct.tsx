"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, HeartIcon } from "@heroicons/react/24/outline";
import NavHead from "../layout/heading/navHead";
import FooterComp from "../layout/footer/footerComp";

const toPersianDigits = (num: number | string) => {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};

interface Variant {
  color: string;
  size: string;
  stock: number;
  price: number;
}

interface Product {
  _id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  variants: Variant[];
}

const colorMap: Record<string, string> = {
  قرمز: "#ff0000",
  آبی: "#0000ff",
  زرد: "#ffff00",
  سبز: "#008000",
  مشکی: "#000000",
  سفید: "#ffffff",
  نارنجی: "#ffa500",
  بنفش: "#800080",
  طلایی: "#ffd700",
  طوسی: "#808080",
  سرخابی: "#ff1493",
  گلبهی: "#ff7f50",
  صورتی: "#ffc0cb",
  "نسکافه ای": "#99634b",
  کرم: "#f5deb3",
  "قهوه ای": "#8b4513",
  نفتی: "#134443",
  فیلی: "#b3b3b3",
  "سبز آبی": "#00a99d",
  سبزآبی: "#00a99d",
  "سبز لاجوردی": "#338f52",
  عسلی: "#cbaf2f",
  "گلبهی پررنگ": "#f05",
  "کرم قهوه ای": "#b84007",
  "کرم نارنجی": "#e6b38f",
  شتری: "#943208",
  "سورمه ای": "#484b56",
  شکلاتی: "#4f444e",
};

export default function AllProduct() {
  const [product, setProduct] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  useEffect(() => {
    axios
      .get<Product[]>(`http://89.42.199.11:5000/api/products`)
      .then((response) => {
        setProduct(response.data);
        setFilteredProducts(response.data);

        const colors = [
          ...new Set(
            response.data.flatMap((item) =>
              item.variants.map((variant) => variant.color)
            )
          ),
        ];
        const sizes = [
          ...new Set(
            response.data.flatMap((item) =>
              item.variants.map((variant) => variant.size)
            )
          ),
        ];

        setAvailableColors(colors);
        setAvailableSizes(sizes);
      })
      .catch((error) => console.error("خطا در دریافت محصولات:", error));
  }, []);

  const applyFilters = () => {
    const filtered = product.filter((item) => {
      const colorMatch = selectedColors.length
        ? item.variants.some((variant) =>
            selectedColors.includes(variant.color)
          )
        : true;
      const sizeMatch = selectedSizes.length
        ? item.variants.some((variant) => selectedSizes.includes(variant.size))
        : true;
      return colorMatch && sizeMatch;
    });

    setFilteredProducts(filtered);
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((item) => item !== color);
      }
      return [...prev, color];
    });
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((item) => item !== size);
      }
      return [...prev, size];
    });
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setFilteredProducts(product);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const rows = useMemo(() => {
    const rowChunks = [];
    for (let i = 0; i < currentProducts.length; i += 4) {
      rowChunks.push(currentProducts.slice(i, i + 3));
    }
    return rowChunks;
  }, [currentProducts]);

  return (
    <div className="bg-gray-100 font-gandom overflow-hidden">
      <div className="p-8">
        <NavHead bgColor="bg-gradient-to-br from-[#fefeff] via-[#f7d1ff] to-[#f8f9ff] backdrop-blur-[10px]" />
      </div>

      <div className="flex justify-between p-8 mt-10">
        {/* محصولات */}
        <div className="w-3/4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-8 mb-8">
              {row.map((item) => (
                <Link key={item._id} href={`/products/${item.slug}`}>
                  <div className="rounded-[12px] w-[14rem] h-[21rem] bg-gradient-to-br from-[#f0f0f0] to-[#cacaca] shadow-[7px_7px_14px_#5a5a5a,-7px_-7px_14px_#ffffff] flex flex-col relative group">
                    {item.images.length > 0 ? (
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={150}
                        height={150}
                        className="rounded-md w-72 h-52 transition-all duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-72 h-52 bg-gray-200 flex items-center justify-center rounded-md">
                        تصویر موجود نیست
                      </div>
                    )}
                    <HeartIcon className="absolute top-2 right-2 w-8 h-8 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-red-400 transition-all duration-300" />
                    <p className="mt-4 text-gray-700 font-gandom text-lg font-bold text-center">
                      {item.name}
                    </p>
                    <p className="mt-1 font-gandom text-red-400 text-center">
                      {item.description}
                    </p>
                    <div className="relative flex items-center justify-end pr-4 mt-5">
                      <p className="font-gandom text-black font-bold" dir="rtl">
                        {`${toPersianDigits(item.price)} تومان`}
                      </p>
                      <span className="ml-2 inline-block w-4 h-4 rounded bg-purple-900 transition-all duration-600 group">
                        <CheckIcon className="w-full h-full text-white stroke-2 transition-all duration-600 group-hover:stroke-purple-500" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}

          {/* صفحه‌بندی */}
          <div className="flex justify-center mt-8 gap-4" dir="rtl">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md transition duration-300 ${
                  currentPage === index + 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-300 text-black hover:bg-purple-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* فیلترها */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 h-[43rem]">
          <h2 className="text-xl font-bold mb-4 text-center">فیلترها</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-end mt-5 mb-5">رنگ‌ها</h3>
            <div className="flex gap-4 flex-wrap justify-end">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded-full transition duration-300 ${
                    selectedColors.includes(color)
                      ? "border-4 border-gray-400"
                      : "border-2 border-gray-300"
                  }`}
                  style={{
                    backgroundColor: colorMap[color] || color, // استفاده از colorMap
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6 text-end">
            <h3 className="text-lg font-semibold  mt-5 mb-5">سایزها</h3>
            <div className="flex gap-4 flex-wrap justify-end">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition duration-300 ${
                    selectedSizes.includes(size)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-purple-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={applyFilters}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            اعمال فیلتر
          </button>
          <button
            onClick={clearFilters}
            className="w-full mt-4 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            پاک کردن فیلترها
          </button>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}
