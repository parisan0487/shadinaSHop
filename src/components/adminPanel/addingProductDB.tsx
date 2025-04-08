"use client";
import React, { useState } from "react";
import axios from "axios";

const AddProductsToDB = () => {
  const [status, setStatus] = useState<string | null>(null);

  const products = [
    {
      id: "123",
      name: "هودی شلوار",
      price: 539000,
      description: "هودی شلوار راحتی و شیک",
      categories: ["best", "boy", "girl", "new", "boyBody"],
      producter: "تهران",
      images: ["/img/boy1.png", "/img/boy1-1.jpg", "/img/boy1-2.jpg"],
      variants: [
        { color: "قرمز", size: "45", stock: 3 },
        { color: "نفتی", size: "50", stock: 8 },
        { color: "آبی", size: "45", stock: 3 },
        { color: "آبی", size: "60", stock: 2 },
      ],
    },
    {
      id: "124",
      name: "بلوز شلوار",
      price: 500000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["boyBody", "boy", "girl", "new"],
      producter: "تهران",
      images: ["/img/boy2.png", "/img/boy2-1.jpg", "/img/boy2-2.jpg"],
      variants: [
        { color: "قرمز", size: "45", stock: 9 },
        { color: "نارنجی", size: "50", stock: 3 },
        { color: "نارنجی", size: "70", stock: 8 },
        { color: "نارنجی", size: "45", stock: 4 },
        { color: "سبز", size: "50", stock: 3 },
        { color: "سبز", size: "45", stock: 3 },
      ],
    },
    {
      id: "125",
      name: "هودی شلوار",
      price: 539000,
      description: "هودی شلوار راحتی و شیک",
      categories: ["best", "boy", "girl", "new"],
      producter: "تهران",
      images: ["/img/boy3.png", "/img/boy3-1.jpg", "/img/boy3-2.jpg"],
      variants: [
        { color: "آبی", size: "60", stock: 3 },
        { color: "قرمز", size: "45", stock: 0 },
        { color: "قرمز", size: "70", stock: 2 },
        { color: "بنفش", size: "50", stock: 5 },
      ],
    },
    {
      id: "126",
      name: "بلوز شلوار مغزی دوزی",
      price: 479000,
      description: "هودی شلوار راحتی و شیک",
      categories: ["boyBody", "boy", "girl", "new"],
      producter: "تهران",
      images: ["/img/boy4.png", "/img/boy4-1.jpg", "/img/boy4-2.jpg"],
      variants: [
        { color: "سبز", size: "45", stock: 7 },
        { color: "قهوه ای", size: "60", stock: 4 },
        { color: "قهوه ای", size: "50", stock: 9 },
        { color: "فیلی", size: "55", stock: 8 },
        { color: "فیلی", size: "70", stock: 1 },
      ],
    },
    {
      id: "127",
      name: "بامبر",
      price: 319000,
      description: "هودی شلوار با کیفیت عالی",
      categories: ["boyBody", "boy", "new"],
      stock: 50,
      producter: "تهران",
      images: ["/img/boy5.png", "/img/boy5-1.png", "/img/boy5-2.png"],
      variants: [
        { color: "سفید", size: "45", stock: 9 },
        { color: "سفید", size: "50", stock: 5 },
        { color: "مشکی", size: "50", stock: 7 },
        { color: "مشکی", size: "60", stock: 1 },
        { color: "مشکی", size: "65", stock: 6 },
        { color: "مشکی", size: "70", stock: 4 },
      ],
    },
    {
      id: "128",
      name: "بلوز شلوار تیکه دوزی",
      price: 230000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["boyBody", "boy", "new"],
      stock: 50,
      producter: "تهران",
      images: ["/img/boy6.png", "/img/boy6-1.jpg", "/img/boy6-2.jpg"],
      variants: [
        { color: "سبز", size: "50", stock: 8 },
        { color: "فیلی", size: "45", stock: 2 },
        { color: "فیلی", size: "50", stock: 1 },
        { color: "فیلی", size: "70", stock: 6 },
        { color: "آبی", size: "60", stock: 3 },
      ],
    },
    {
      id: "129",
      name: "بلوز شلوار",
      price: 439000,
      discount: 350000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["offer", "boy", "new"],
      stock: 50,
      producter: "تهران",
      images: ["/img/boy7.png", "/img/boy7-1.jpg", "/img/boy7-2.jpg"],
      variants: [
        { color: "عسلی", size: "40", stock: 2 },
        { color: "نسکافه ای", size: "50", stock: 3 },
        { color: "مشکی", size: "45", stock: 1 },
        { color: "سبز لاجوردی", size: "60", stock: 0 },
      ],
    },
    {
      id: "131",
      name: "سوییشرت بگ استایل",
      price: 239000,
      discount: 200000,
      description: "سوییشرت بگ استایل  با کیفیت عالی",
      categories: ["offer", "boy", "new"],
      producter: "تهران",
      images: ["/img/boy8.png", "/img/boy8-1.jpg", "/img/boy8-2.jpg"],
      variants: [
        { color: "قرمز", size: "40", stock: 1 },
        { color: "قهوه ای", size: "65", stock: 7 },
        { color: "قهوه ای", size: "55", stock: 9 },
        { color: "قهوه ای", size: "45", stock: 6 },
        { color: "مشکی", size: "60", stock: 3 },
        { color: "مشکی", size: "50", stock: 2 },
      ],
    },
    {
      id: "132",
      name: "بلوز شلوار",
      price: 340000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["boyBody", "boy", "new"],
      producter: "تهران",
      images: ["/img/boy9.png", "/img/boy9-1.jpg", "/img/boy9-2.jpg"],
      variants: [
        { color: "نارنجی", size: "45", stock: 2 },
        { color: "قرمز", size: "50", stock: 3 },
        { color: "قرمز", size: "55", stock: 5 },
        { color: "قرمز", size: "60", stock: 2 },
        { color: "صورتی", size: "55", stock: 10 },
        { color: "صورتی", size: "70", stock: 7 },
      ],
    },
    {
      id: "133",
      name: "شکت چهارخونه داخل خز",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["best", "boy", "new"],
      producter: "تهران",
      images: ["/img/boy10.png", "/img/boy10-1.jpg", "/img/boy10-2.jpg"],
      variants: [
        { color: "مشکی", size: "60", stock: 1 },
        { color: "مشکی", size: "50", stock: 8 },
        { color: "مشکی", size: "55", stock: 6 },
      ],
    },
    {
      id: "134",
      name: "بلوز شلوار خرسی",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["best", "boy", "new"],
      producter: "تهران",
      images: ["/img/boy11.png", "/img/boy11-1.jpg", "/img/boy11-2.jpg"],
      variants: [
        { color: "کرم", size: "45", stock: 1 },
        { color: "کرم", size: "50", stock: 5 },
        { color: "کرم", size: "40", stock: 8 },
        { color: "آبی", size: "60", stock: 9 },
        { color: "سبز", size: "55", stock: 3 },
      ],
    },
    {
      id: "135",
      name: "بلوز شلوار آدیداس",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      category: "موجودی",
      categories: ["boy", "new"],
      producter: "تهران",
      images: ["/img/boy12.png", "/img/boy12-1.jpg", "/img/boy12-2.jpg"],
      variants: [
        { color: "سبز", size: "40", stock: 9 },
        { color: "سفید", size: "45", stock: 7 },
        { color: "سفید", size: "50", stock: 1 },
        { color: "طلایی", size: "55", stock: 3 },
      ],
    },
    {
      id: "136",
      name: "بلوز شلوار خط دار",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["boy", "new"],
      producter: "تهران",
      images: ["/img/boy13.png", "/img/boy13-1.jpg", "/img/boy13-2.jpg"],
      variants: [
        { color: "زرد", size: "50", stock: 3 },
        { color: "نارنجی", size: "60", stock: 5 },
        { color: "قرمز", size: "70", stock: 7 },
        { color: "قرمز", size: "60", stock: 3 },
        { color: "قرمز", size: "55", stock: 4 },
      ],
    },
    {
      id: "137",
      name: "بلوز شلوار",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["boy", "new"],
      producter: "تهران",
      images: ["/img/boy14.png", "/img/boy14-1.jpg", "/img/boy14-2.jpg"],
      variants: [
        { color: "قرمز", size: "45", stock: 6 },
        { color: "نفتی", size: "50", stock: 8 },
        { color: "نفتی", size: "60", stock: 9 },
      ],
    },
    {
      id: "138",
      name: "بلوز شلوار چاپی دایناسور",
      price: 150000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["boy", "new"],
      producter: "تهران",
      images: ["/img/boy15.png", "/img/boy15-1.jpg", "/img/boy15-2.jpg"],
      variants: [
        { color: "نسکافه ای", size: "60", stock: 1 },
        { color: "نسکافه ای", size: "45", stock: 6 },
        { color: "طوسی", size: "55", stock: 5 },
      ],
    },
    {
      id: "139",
      name: "بلوز شلوار پاندا ",
      price: 290000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["boy", "girl", "new", "girlBody"],
      producter: "تهران",
      images: ["/img/girl1.png", "/img/girl1-1.jpg", "/img/girl1-2.jpg"],
      variants: [
        { color: "سبز", size: "50", stock: 3 },
        { color: "سبز", size: "60", stock: 3 },
        { color: "صورتی", size: "55", stock: 1 },
        { color: "قرمز", size: "60", stock: 6 },
        { color: "قرمز", size: "70", stock: 4 },
      ],
    },
    {
      id: "141",
      name: "بلوز شلوار طیفی",
      price: 330000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["boy", "girl", "new", "girlBody"],
      producter: "تهران",
      images: ["/img/girl2.png", "/img/girl2-1.jpg", "/img/girl2-2.jpg"],
      variants: [
        { color: "سفید", size: "41", stock: 1 },
        { color: "سفید", size: "65", stock: 8 },
        { color: "بنفش", size: "50", stock: 5 },
        { color: "بنفش", size: "45", stock: 2 },
        { color: "قهوه ای", size: "55", stock: 4 },
      ],
    },
    {
      id: "142",
      name: "بلوز شلوار چریک",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      category: "موجودی",
      categories: ["boy", "girl", "new", "girlBody", "best"],
      producter: "تهران",
      images: ["/img/girl3.png", "/img/girl3-1.jpg", "/img/girl3-2.jpg"],
      variants: [
        { color: "سفید", size: "45", stock: 6 },
        { color: "سفید", size: "50", stock: 4 },
        { color: "سفید", size: "55", stock: 2 },
      ],
    },
    {
      id: "143",
      name: "بلوز شلوار کله فندقی",
      price: 230000,
      description: "بلوز شلوار با کیفیت عالی",
      category: "موجودی",
      categories: ["boy", "girl", "new", "girlBody"],
      producter: "تهران",
      images: ["/img/girl4.png", "/img/girl4-1.jpg", "/img/girl4-2.jpg"],
      variants: [
        { color: "نسکافه ای", size: "45", stock: 1 },
        { color: "نسکافه ای", size: "60", stock: 3 },
        { color: "نسکافه ای", size: "55", stock: 5 },
      ],
    },
    {
      id: "144",
      name: "بلوز شلوار یونیکرون",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      category: "موجودی",
      categories: ["boy", "girl", "new", "girlBody"],
      producter: "تهران",
      images: ["/img/girl5.png", "/img/girl5-1.jpg", "/img/girl5-2.jpg"],
      variants: [
        { color: "گلبهی پررنگ", size: "40", stock: 2 },
        { color: "گلبهی پررنگ", size: "50", stock: 1 },
        { color: "سرخابی", size: "70", stock: 1 },
      ],
    },
    {
      id: "145",
      name: "بلوز شلوار مغزی دوزی",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      category: "موجودی",
      categories: ["girl", "new", "girlBody", "best"],
      producter: "تهران",
      images: ["/img/girl6.png", "/img/girl6-1.jpg", "/img/girl6-2.jpg"],
      variants: [
        { color: "سفید", size: "50", stock: 3 },
        { color: "سبز", size: "65", stock: 9 },
        { color: "صورتی", size: "70", stock: 1 },
      ],
    },
    {
      id: "146",
      name: "بلوز شلوار گارفیلد",
      price: 250000,
      discount: 200000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["girl", "new", "girlBody", "offer"],
      producter: "تهران",
      images: ["/img/girl7.png", "/img/girl7-1.jpg", "/img/girl7-2.jpg"],
      variants: [
        { color: "سبز", size: "45", stock: 6 },
        { color: "قهوه ای", size: "50", stock: 1 },
        { color: "آبی", size: "55", stock: 3 },
      ],
    },
    {
      id: "147",
      name: "بلوز شلوار بگ استایل",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["girl", "new"],
      producter: "تهران",
      images: ["/img/girl8.png", "/img/girl8-1.jpg", "/img/girl8-2.jpg"],
      variants: [
        { color: "قهوه ای", size: "45", stock: 6 },
        { color: "نارنجی", size: "50", stock: 7 },
      ],
    },
    {
      id: "148",
      name: "بلوز شلوار بگ استایل",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["girl", "new"],
      producter: "تهران",
      images: ["/img/girl9.png", "/img/girl9-1.jpg", "/img/girl9-2.jpg"],
      variants: [
        { color: "آبی", size: "41", stock: 2 },
        { color: "سبز", size: "50", stock: 1 },
      ],
    },
    {
      id: "149",
      name: "بلوز شلوار دایناسور",
      price: 250000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["girl", "new"],
      producter: "تهران",
      images: ["/img/girl10.png", "/img/girl10-1.jpg", "/img/girl10-2.jpg"],
      variants: [{ color: "سبز آبی", size: "40", stock: 8 }],
    },
    {
      id: "151",
      name: "بلوز شلوار بگ پاپیونی",
      price: 230000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["girl", "new"],
      producter: "تهران",
      images: ["/img/girl11.png", "/img/girl11-1.jpg", "/img/girl11-2.jpg"],
      variants: [
        { color: "قرمز", size: "45", stock: 0 },
        { color: "نارنجی", size: "50", stock: 4 },
        { color: "سبز", size: "45", stock: 3 },
      ],
    },
    {
      id: "152",
      name: "بلوز شلوار مغزی دوزی",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["girl", "new"],
      producter: "تهران",
      images: ["/img/girl12.png", "/img/girl12-1.jpg", "/img/girl12-2.jpg"],
      variants: [
        { color: "مشکی", size: "40", stock: 10 },
        { color: "شتری", size: "45", stock: 7 },
        { color: "سورمه ای", size: "50", stock: 12 },
      ],
    },
    {
      id: "153",
      name: "بلوز شلوار بگ استایل",
      price: 339000,
      discount: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["girl", "new", "offer"],
      producter: "تهران",
      images: ["/img/girl13.png", "/img/girl13-1.jpg", "/img/girl13-2.jpg"],
      variants: [
        { color: "قهوه ای", size: "45", stock: 7 },
        { color: "سفید", size: "50", stock: 3 },
      ],
    },
    {
      id: "154",
      name: "تیشرت شلوار کوالا",
      price: 239000,
      description: "بلوز شلوار با کیفیت عالی",
      category: "موجودی",
      categories: ["girl", "new"],
      producter: "تهران",
      images: ["/img/girl14.png", "/img/girl14-1.jpg", "/img/girl14-2.jpg"],
      variants: [
        { color: "طوسی", size: "40", stock: 10 },
        { color: "طوسی", size: "45", stock: 10 },
        { color: "طوسی", size: "50", stock: 10 },
      ],
    },
    {
      id: "155",
      name: "بلوز شلوار مادر دختری",
      price: 250000,
      discount: 230000,
      description: "بلوز شلوار با کیفیت عالی",
      categories: ["girl", "new", "offer"],
      producter: "تهران",
      images: ["/img/girl15.png", "/img/girl15-1.jpg", "/img/girl15-2.jpg"],
      variants: [
        { color: "مشکی", size: "55", stock: 3 },
        { color: "شکلاتی", size: "60", stock: 5 },
        { color: "شکلاتی", size: "65", stock: 8 },
        { color: "شکلاتی", size: "70", stock: 2 },
      ],
    },
  ];

  const addProducts = async () => {
    setStatus("در حال ارسال...");
    try {
      const productsToSend = products.map((product) => ({
        ...product,
      }));

      await axios.post(
        "https://shadback-production.up.railway.app/api/products/add-multiple",
        { products: productsToSend },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatus("اضافه شد");
    } catch (error: any) {
      console.error(
        "خطا در افزودن محصولات:",
        error.response ? error.response.data : error.message
      );
      setStatus("خطا در ارسال محصولات!");
    }
  };

  const deleteAllProducts = async () => {
    try {
      await axios.delete("https://shadback-production.up.railway.app/api/products/delete-all");
      alert("پاک شد");
    } catch (error: any) {
      console.error(
        "خطا در حذف تمام محصولات:",
        error.response ? error.response.data : error.message
      );
      alert("خطا در حذف محصولات");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <button
        onClick={addProducts}
        className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all"
      >
        افزودن محصولات
      </button>
      {status && <p className="text-gray-700 font-semibold">{status}</p>}

      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <button
          onClick={deleteAllProducts}
          className="px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-lg transition-all"
        >
          حذف تمام محصولات
        </button>
      </div>
    </div>
  );
};

export default AddProductsToDB;
