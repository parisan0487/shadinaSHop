"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "@/components/layout/footer/footerComp";
import { HeartIcon } from "@heroicons/react/24/outline";
import { queryClient } from "@/app/providers/queryClient";
import New from "../slider/new";
import Loading from "@/app/products/[id]/loading";
import NavHead from "../layout/heading/navHead";

const toPersianDigits = (num: number | string) => {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};

interface Variant {
  color: string;
  size: string;
  stock: number;
}

interface Product {
  _id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  variants: Variant[];
  producter?: string;
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

export default function ProductComp() {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [IsOpenSize, setIsOpenSize] = useState(false);

  // const { mutate: updateCart } = useUpdateCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // بررسی نوع params.id و تقسیم آن فقط در صورتی که رشته باشد
        if (typeof params.id === "string") {
          const [id, slug] = params.id.split("-"); // تقسیم id و slug
          console.log("Fetching product with id:", id, "and slug:", slug);
          const url = `http://localhost:5000/api/products/${params.id}`;
          const response = await axios.get(url);
          if (response.status === 200) {
            setProduct(response.data);
          } else {
            console.log("Unexpected response status:", response.status);
          }
        } else {
          console.error("Invalid params.id format:", params.id);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    console.log("Product state after setting:", product);
  }, [product]);

  useEffect(() => {
    setSelectedSize(null);
  }, [selectedColor]);

  if (!product) return <Loading />;

  console.log(
    "🎨 رنگ‌های دریافتی در فرانت‌اند:",
    product?.variants.map((v) => `"${v.color}"`)
  );

  const handleValidation = () => {
    if (!selectedColor || !selectedSize) {
      setMessage("لطفاً رنگ و سایز را انتخاب کنید");
      setIsOpen(true);
      return false;
    }
    return true;
  };

  const addToCart = async () => {
    if (!handleValidation()) return;

    try {
      setLoading(true);
      setMessage(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("لطفاً ابتدا وارد حساب کاربری خود شوید");
        setIsOpen(true);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
          color: selectedColor,
          size: selectedSize,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message || "محصول با موفقیت اضافه شد");
      setIsOpen(true);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error: any) {
      setMessage(error.response?.data?.message || "خطایی رخ داد");
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const addToLovely = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("لطفاً ابتدا وارد حساب کاربری خود شوید");
        setIsOpen(true);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/wishlist/add",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("ProductId:", product._id);
      setMessage(response.data.message || "محصول با موفقیت اضافه شد");
      setIsOpen(true);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    } catch (error: any) {
      console.log(error);

      if (
        error.response?.status === 400 &&
        error.response.data.message === "محصول قبلاً اضافه شده است"
      ) {
        setMessage("این محصول قبلاً به علاقه‌مندی‌ها اضافه شده است");
        setIsOpen(true);
      } else {
        setMessage(error.response?.data?.message || "خطایی رخ داد");
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedVariant = product?.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : false; // ✅ مقدار پیش‌فرض false باشد

  const colors = Array.from(
    new Set(product.variants.map((v: Variant) => v.color.trim()))
  );

  const availableSizes = selectedColor
    ? product.variants
        .filter((v: Variant) => v.color === selectedColor)
        .map((v: Variant) => v.size)
    : [];

  console.log(product);

  return (
    <>
      <div className="p-10 bg-gray-100 overflow-hidden">
        <NavHead bgColor="bg-gradient-to-br from-[#f3e8ff] via-[#f7d1ff] to-[#f8f9ff] backdrop-blur-[10px]" />

        <div className="h-20 w-full"></div>

        <div className="text-end p-6 rounded-2xl bg-gray-100 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff,8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)] relative overflow-visible flex flex-col md:flex-row font-gandom">
          <div className="md:w-1/2 md:pr-10 mt-10 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <span className="w-full h-[2px] bg-purple-500 flex"></span>
            <HeartIcon
              className="absolute w-8 h-8 text-red-400 top-[1rem]"
              onClick={addToLovely}
            />

            <div className="flex gap-[490px]">
              <p className=" font-bold text-xl mt-4" dir="rtl">
                {product.producter}
              </p>
              <p className="font-semibold mt-4">:تولید</p>
            </div>

            <div className="flex gap-[420px]">
              <p className="text-purple-700 font-bold text-xl mt-4" dir="rtl">
                {toPersianDigits(product.price)} تومان
              </p>
              <p className="font-semibold mt-4">:قیمت</p>
            </div>

            {/* بخش انتخاب رنگ */}
            <div className="mt-10">
              <p className="font-semibold">:رنگبندی</p>
              <div className="flex gap-2 mt-2">
                {colors.map((color) => (
                  <div key={color} className="relative group">
                    <button
                      style={{
                        backgroundColor: colorMap[color] || "#ccc",
                      }}
                      className={`w-8 h-8 border border-gray-300 rounded-full ${
                        selectedColor === color ? "ring-2 ring-black" : ""
                      }`}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedSize(null);
                      }}
                    />
                    {/* تولتیپ استایل جدید */}
                    <span className="absolute right-1/2 translate-x-1/2 -top-10 bg-purple-600 text-black text-xs px-2 py-1 rounded shadow-md opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                      {color}
                      <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-purple-600 rotate-45"></span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* بخش انتخاب سایز */}
            {selectedColor && (
              <div className="mt-4 text-right">
                <p className="font-semibold">:سایزبندی</p>
                <div className="flex gap-2 mt-2">
                  {availableSizes.length > 0 ? (
                    availableSizes.map((size) => (
                      <button
                        key={size}
                        className={`border border-gray-400 px-2 py-1 rounded hover:bg-gray-200 ${
                          selectedSize === size ? "bg-purple-700" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))
                  ) : (
                    <p className="text-red-500">
                      برای این رنگ، سایزی موجود نیست
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={addToCart}
              disabled={isOutOfStock}
              className={`mt-10 bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-all shadow-md disabled:bg-gray-400 ${
                isOutOfStock
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
            >
              {loading ? "...درحال افزودن" : "افزودن به سبد خرید"}
            </button>

            {isOutOfStock && (
              <p className="text-red-500 mt-2">این محصول موجود نیست</p>
            )}

            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
                <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 p-8 rounded-3xl shadow-2xl max-w-md text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {message}
                  </h2>
                  <div className="mt-6 flex justify-center gap-4">
                    {message?.includes("علاقه‌مندی") ? (
                      <a
                        href="/lovely"
                        className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-purple-100 transition-all duration-300"
                      >
                        مشاهده علاقه‌مندی‌ها ❤️
                      </a>
                    ) : (
                      <a
                        href="/basket"
                        className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-purple-100 transition-all duration-300"
                      >
                        مشاهده سبد خرید 🛒
                      </a>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-purple-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-800 transition-all duration-300"
                    >
                      ماندن در این صفحه 🚀
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              className="flex w-32 h-14 rounded-lg shadow-md overflow-hidden mt-16"
              onClick={() => setIsOpenSize(true)}
            >
              <div className="w-1/2 h-full">
                <Image
                  src="/img/size.png"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="w-1/2 h-full flex items-center justify-center bg-purple-800 text-white text-sm">
                راهنمای انتخاب سایز
              </span>
            </button>

            {IsOpenSize && (
              <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
                <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 p-8 rounded-3xl shadow-2xl w-auto text-center">
                  <div className="flex">
                    <Image
                      src="/img/help-blouse.jpg"
                      alt="Icon"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                    <Image
                      src="/img/help-pants.jpg"
                      alt="Icon"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => setIsOpenSize(false)}
                    className="bg-purple-700 text-white px-6 mt-8 py-2 rounded-full font-semibold hover:bg-purple-800 transition-all duration-300"
                  >
                    👍فهمیدم
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center md:w-1/2">
            <div className="border-2 border-black p-2 rounded-lg">
              <Image
                src={selectedImage || product.images[0]}
                alt={product.name}
                width={400}
                height={0}
                className="rounded-lg shadow-md h-[28rem]"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {product.images.map((img: string, index: number) => (
                <div
                  key={index}
                  className={`border-2 p-1 rounded-md cursor-pointer transition-all ${
                    selectedImage === img
                      ? "border-purple-700"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`تصویر ${index + 1}`}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32">
          <p
            ref={sectionRef}
            className={`latest-products text-center mb-8 font-gandom text-4xl font-extrabold bg-clip-text text-purple-700 relative ${
              isVisible ? "animate-visible" : ""
            }`}
          >
            محصولات مشابه
          </p>
          <New />
        </div>
      </div>
      <Footer />
    </>
  );
}
