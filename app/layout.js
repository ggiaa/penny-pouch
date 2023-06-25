"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import {
  AiOutlineHome,
  AiOutlineLineChart,
  AiOutlineCreditCard,
  AiOutlineSetting,
  AiOutlinePlus,
} from "react-icons/ai";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "Penny Pouch",
  description: "Money Manager",
};

export default function RootLayout({ children }) {
  const segments = useSelectedLayoutSegments();

  console.log(segments);
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="h-[90vh]">{children}</div>
        <div className="h-[10vh] flex justify-center items-center pb-2">
          <div className="bg-white grid grid-cols-5 items-center text-center gap-4 w-2/5 rounded-full py-1 shadow-lg border border-slate-300">
            <div>
              <Link href="/">
                <AiOutlineHome
                  className={`text-xl mx-auto mb-1 transition-all ${
                    !segments.length ? "text-blue-600" : ""
                  }`}
                />
                <p
                  className={`text-xs ${
                    !segments.length ? "text-blue-600" : "hidden"
                  }`}
                >
                  Home
                </p>
              </Link>
            </div>
            <div>
              <Link href="/statistic">
                <AiOutlineLineChart
                  className={`text-xl mx-auto mb-1 transition-all ${
                    segments.includes("statistic") ? "text-blue-600" : ""
                  }`}
                />
                <p
                  className={`text-xs ${
                    segments.includes("statistic") ? "text-blue-600" : "hidden"
                  }`}
                >
                  Statistic
                </p>
              </Link>
            </div>
            <div className="relative h-full">
              <div className="absolute bg-blue-600 p-1 right-0 left-0 top-0 bottom-0 rounded-full origin-center h-full scale-150 mx-auto aspect-square border border-slate-300 group hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 overflow-hidden">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <AiOutlinePlus className="text-white text-2xl mx-auto h-full  group-hover:rotate-90 duration-500 ease" />
              </div>
            </div>
            <div>
              <Link href="/budgeting">
                <AiOutlineCreditCard
                  className={`text-xl mx-auto mb-1 transition-all ${
                    segments.includes("budgeting") ? "text-blue-600" : ""
                  }`}
                />
                <p
                  className={`text-xs ${
                    segments.includes("budgeting") ? "text-blue-600" : "hidden"
                  }`}
                >
                  Budgeting
                </p>
              </Link>
            </div>
            <div>
              <Link href="/budgeting">
                <AiOutlineSetting
                  className={`text-xl mx-auto mb-1 transition-all ${
                    segments.includes("settings") ? "text-blue-600" : ""
                  }`}
                />
                <p
                  className={`text-xs ${
                    segments.includes("settings") ? "text-blue-600" : "hidden"
                  }`}
                >
                  Settings
                </p>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
