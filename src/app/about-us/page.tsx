import FooterComp from "@/components/layout/footer/footerComp";
import NavHead from "@/components/layout/heading/navHead";

export default function AboutUs() {
  return (
    <>
      <div className="p-8 bg-gradient-to-r from-purple-200 to-pink-100  font-gandom overflow-hidden">
        <NavHead bgColor="bg-gradient-to-br from-[#fefeff] via-[#f7d1ff] to-[#f8f9ff] backdrop-blur-[10px]" />
      </div>
      <div className="bg-gray-100 text-gray-900 min-h-screen p-6 flex flex-col items-center font-gandom">
        <div className="text-center mt-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-6">
            درباره شادینا
          </h1>
          <p className="text-lg max-w-2xl text-gray-700">
            شادینا، جایی که کیفیت، راحتی و طراحی خاص برای کودکان به واقعیت تبدیل
            می‌شود. ما لباس‌هایی را خلق می‌کنیم که کودکان احساس شادابی و آزادی
            در آن داشته باشند
          </p>
        </div>

        <div className="mt-16 max-w-4xl text-center p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            چرا شادینا؟
          </h2>
          <p className="text-md text-gray-600 leading-relaxed">
            در شادینا، ما با استفاده از بهترین پارچه‌ها و طراحی‌های مدرن، لباسی
            می‌سازیم که هم جذاب باشد و هم راحت. هدف ما این است که کودکان نه‌تنها
            شیک باشند، بلکه حس خوبی نسبت به لباسی که می‌پوشند داشته باشند
          </p>
        </div>

        {/* ارزش‌های ما */}
        <div className="mt-16 max-w-4xl text-center p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            ارزش‌های ما
          </h2>
          <ul className="text-md text-gray-600 leading-relaxed space-y-2">
            <li className="flex items-center justify-center">
              <span className="text-purple-500 text-xl mr-2">✔</span> استفاده از
              پارچه‌های مرغوب و بادوام
            </li>
            <li className="flex items-center justify-center">
              <span className="text-purple-500 text-xl mr-2">✔</span> طراحی شیک
              و راحت برای کودکان
            </li>
            <li className="flex items-center justify-center">
              <span className="text-purple-500 text-xl mr-2">✔</span> توجه به
              نیازهای والدین و کودکان
            </li>
            <li className="flex items-center justify-center">
              <span className="text-purple-500 text-xl mr-2">✔</span> پایبندی به
              محیط زیست با استفاده از مواد پایدار
            </li>
          </ul>
        </div>

        {/* تماس با ما */}
        <div className="mt-16 mb-12 text-center p-6 bg-purple-600 text-white shadow-lg rounded-2xl max-w-4xl">
          <h2 className="text-3xl font-bold mb-3">با ما در ارتباط باشید</h2>
          <p className="text-md">
            ما همیشه آماده شنیدن نظرات و پیشنهادات شما هستیم. از طریق شبکه‌های
            اجتماعی با ما در تماس باشید
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://www.instagram.com/parisan_0487/"
              className="bg-white text-purple-600 p-3 rounded-full shadow-md hover:bg-purple-500 hover:text-white transition"
            >
              اینستاگرام
            </a>
            <a
              href="https://www.telegram.com/parisan_0487/"
              className="bg-white text-purple-600 p-3 rounded-full shadow-md hover:bg-purple-500 hover:text-white transition"
            >
              تلگرام
            </a>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
}
