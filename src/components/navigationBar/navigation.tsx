import Link from "next/link";
import {
  HomeIcon,
  ShoppingBagIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export default function NavigationBar() {
  return (
    <div
      className="hidden font-gandom"
      style={{ zIndex: 9999999 }}
      id="navigation"
    >
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center py-3 rounded-t-3xl z-[1000]">
        <Link href="/basket">
          <span className="flex flex-col items-center text-black hover:text-purple-600 transition">
            <ShoppingBagIcon className="w-7 h-7" />
            <span className="text-sm">سبد خرید</span>
          </span>
        </Link>
        <Link href="/">
          <span className="relative flex flex-col items-center bg-purple-600 text-white rounded-full p-4 -mt-6 shadow-lg">
            <HomeIcon className="w-6 h-6" />
            <span className="text-sm">خانه</span>
          </span>
        </Link>
        <Link href="/lovely">
          <span className="flex flex-col items-center text-black hover:text-purple-600 transition">
            <HeartIcon className="w-6 h-6" />
            <span className="text-sm">علاقه‌مندی‌ها</span>
          </span>
        </Link>
      </nav>
    </div>
  );
}
