import Image from "next/image";
import Link from "next/link";

export default function FooterComp() {
  return (
    <div>
      <div className="relative w-full h-auto p-10 bg-purple-300 overflow-hidden font-gandom">
        <div className="absolute top-[-150px] left-[-200px] w-[500px] h-[500px] bg-gradient-to-br from-[#f3e8ff] via-[#f7d1ff] to-[#f8f9ff] rounded-full opacity-40"></div>
        <div className="absolute bottom-[-150px] right-[-200px] w-[500px] h-[500px] bg-gradient-to-br from-[#f3e8ff] via-[#f7d1ff] to-[#f8f9ff] rounded-full opacity-40"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 text-right">
          <div>{/* نماد */}</div>

          <div>
            <h3 className="text-lg font-semibold mb-3">دسته‌بندی‌ها</h3>
            <ul className="space-y-2  mt-[30px]">
              <li>
                <Link href="/boy">
                  <span className="hover:text-gray-700 font-bold">پسرانه</span>
                </Link>
              </li>
              <li>
                <Link href="/girl">
                  <span className="hover:text-gray-700 font-bold">دخترانه</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">لینک‌های مفید</h3>
            <ul className="space-y-2 mt-[30px]">
              <li>
                <Link href="/contact-us">
                  <span className="hover:text-gray-700 font-bold">
                    تماس با ما
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                  <span className="hover:text-gray-700 font-bold">
                    درباره ما
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/newProduct">
                  <span className="hover:text-gray-700 font-bold">
                    جدیدترین محصولات
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl opacity-90 mb-4 mr-[17px]">
              ارتباط با شادینا
            </h2>
            <div className="flex items-center font-bold opacity-90 ml-[59px]">
              <span>کاشمر، بین مدرس ۲-۴ </span>
              <Image
                src="/img/location.png"
                alt="Location"
                width={30}
                height={30}
                className="opacity-90 m-3"
              />
            </div>
            <div className="flex items-center font-bold opacity-90 ml-[88px]">
              <span>shadina_shop1</span>
              <Image
                src="/img/instagram.png"
                alt="Instagram"
                width={30}
                height={30}
                className="opacity-90 m-3"
              />
            </div>
            <div className="flex items-center font-bold opacity-90 ml-[94px]">
              <span>0905 186 7829</span>
              <Image
                src="/img/call.png"
                alt="Call"
                width={30}
                height={30}
                className="opacity-90 m-3"
              />
            </div>
            <div className="flex items-center font-bold opacity-90 ml-[-3px]">
              <span>shadina_shop1@gmail.com</span>
              <Image
                src="/img/email.png"
                alt="Email"
                width={30}
                height={30}
                className="opacity-90 m-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
