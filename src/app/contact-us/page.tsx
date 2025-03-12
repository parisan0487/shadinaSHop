import FooterComp from "@/components/layout/footer/footerComp";
import NavHead from "@/components/layout/heading/navHead";

export default function ContactUs() {
  return (
    <>
      <div className="p-8 bg-gradient-to-r from-purple-200 to-pink-100  font-gandom">
        <NavHead bgColor="bg-gradient-to-br from-[#fefeff] via-[#f7d1ff] to-[#f8f9ff] backdrop-blur-[10px]" />
      </div>
      <div className="bg-gray-100 text-gray-900 min-h-screen p-6 flex flex-col items-center font-gandom">
        <div className="text-center mt-10">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-6">
            تماس با ما
          </h1>
          <p className="text-lg max-w-2xl text-gray-700">
            ما همیشه آماده شنیدن نظرات، پیشنهادات و سؤالات شما هستیم. با ما در
            تماس باشید
          </p>
        </div>

        <div className="mt-12 max-w-4xl text-center p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            راه‌های ارتباطی
          </h2>
          <p className="text-md text-gray-600 leading-relaxed">
            شما می‌توانید از طریق روش‌های زیر با ما ارتباط برقرار کنید
          </p>
          <div className="mt-6 space-y-4">
            <p className="text-lg">
              <span className="font-semibold text-purple-600">📍 آدرس:</span>{" "}
              کاشمر، بین مدرس ۲-۴
            </p>
            <p className="text-lg">
              <span className="font-semibold text-purple-600">📞 تلفن:</span>{" "}
              7829 186 0905
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl text-center p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            ارسال پیام
          </h2>
          <form className="flex flex-col space-y-4 ">
            <input
              type="text"
              placeholder="نام شما"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-end"
            />
            <input
              type="email"
              placeholder="ایمیل شما"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-end"
            />
            <textarea
              placeholder="پیام شما"
              rows="4"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-end"
            ></textarea>
            <button className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition font-bold ">
              ارسال پیام
            </button>
          </form>
        </div>

        <div className="mt-12 mb-12 text-center p-6 bg-purple-600 text-white shadow-lg rounded-2xl max-w-4xl">
          <h2 className="text-3xl font-bold mb-3">
            ما را در شبکه‌های اجتماعی دنبال کنید
          </h2>
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
