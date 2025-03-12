import NavHead from "@/components/layout/heading/navHead";
import Stepper from "@/components/slider/stepper";
import Link from "next/link";

const Checkout = () => {
  return (
    <>
      <div className="min-h-screen p-8 bg-gradient-to-r from-purple-200 to-pink-100 font-gandom overflow-hidden">
        <NavHead bgColor="bg-gradient-to-br from-[#fefeff] via-[#f7d1ff] to-[#f8f9ff] backdrop-blur-[10px]" />
        <Stepper currentStep={2} />
        <div className="flex justify-center items-center">
          <div className="w-full max-w-4xl shadow-xl bg-white rounded-2xl overflow-hidden">
            <div className=" md:grid-cols-2 gap-6 p-10">
              <div>
                <h2 className="text-2xl font-semibold text-purple-800 mb-6 text-center">
                  جزئیات صورت‌حساب
                </h2>
                <div className="grid grid-cols-2 gap-6 ">
                  <input
                    placeholder="نام خانوادگی"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-end"
                  />
                  <input
                    placeholder="نام"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-end"
                  />
                  <input
                    placeholder="شهر"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-end"
                  />
                  <input
                    placeholder="استان"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-end"
                  />
                  <input
                    placeholder="آدرس خیابان"
                    className="col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-end"
                  />
                  <input
                    placeholder="کدپستی"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-end"
                  />
                  <input
                    placeholder="تلفن"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-end"
                  />
                  <textarea
                    placeholder="توضیحات سفارش (اختیاری)"
                    className="col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none h-32 text-end"
                  ></textarea>
                </div>
                <Link href="/basket/chckout/pay">
                  <button className="mt-8 w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition-all duration-300 text-lg">
                    ثبت سفارش
                  </button>
                </Link>
              </div>
              <Link href="/basket">
                <button className="mt-8 text-end bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition-all duration-300 text-lg">
                  برگشتن به سبد خرید
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
