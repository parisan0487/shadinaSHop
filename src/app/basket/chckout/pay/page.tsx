import Link from "next/link";

export default function Pay() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 font-gandom overflow-hidden">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center max-w-md">
        <p className="text-red-600 font-bold text-lg">
          متاسفانه این سایت به درگاه پرداخت متصل نیست
        </p>
        <p className="text-gray-700 mt-4">
          شما می‌توانید برای ثبت سفارش با این شماره تماس بگیرید
        </p>
        <p className="mt-3 font-bold text-lg">09332100000</p>
        <Link href="/">
          <button className="mt-8 text-end bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition-all duration-300 text-lg">
            برگشتن به صفحه اصلی
          </button>
        </Link>
      </div>
    </div>
  );
}
