import SimpleImageSwiper from "../../slider/sliderHed";
import Link from "next/link";
import NavHead from "@/components/layout/heading/navHead";

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
        <div className="w-1/2 pr-10 text-right" id="text">
          <h1
            className="text-4xl font-extrabold text-purple-800 opacity-90"
            id="textH1"
          >
            !باشادینا شیک به نظر برسید
          </h1>
          <p className="mt-4 opacity-90 font-bold" id="textP">
            پوشاک با کیفیت، راحت و شیک برای کوچولوها با بهترین قیمت‌ها و طرح‌های
            جذاب
          </p>
          <Link href="/shop">
            <button
              className="mt-6 bg-purple-500 text-black hover:text-purple-500 px-6 py-3 rounded-full hover:bg-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
              id="textButton"
            >
              مشاهده محصولات
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderComp;
