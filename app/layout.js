import "./globals.css";
import { Poppins } from "next/font/google";
import {
  AiOutlineHome,
  AiOutlineLineChart,
  AiOutlineCreditCard,
  AiOutlineSetting,
  AiOutlinePlus,
} from "react-icons/ai";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "Penny Pouch",
  description: "Money Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="h-[90vh]">{children}</div>
        <div className="h-[10vh] flex justify-center items-center pb-2">
          <div className="bg-white shadow-2xl rounded-full flex gap-x-16 relative px-8 py-1 text-xs">
            <div>
              <AiOutlineHome className="text-xl mx-auto mb-1" />
              <p className="">Home</p>
            </div>
            <div>
              <AiOutlineLineChart className="text-xl mx-auto mb-1" />
              <p className="">Statistic</p>
            </div>
            <div className="rounded-full overflow-hidden aspect-square absolute h-14 bg-blue-500 group left-1/2 top-1/2 -ml-[44px] -mt-[28px] shadow-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <AiOutlinePlus className="mx-auto my-auto h-full text-4xl text-white" />
            </div>
            <div className="invisible">
              <AiOutlineHome className="text-xl mx-auto mb-1 bg-red-300 h-full" />
            </div>
            <div>
              <AiOutlineCreditCard className="text-xl mx-auto mb-1" />
              <p className="">Budgeting</p>
            </div>
            <div>
              <AiOutlineSetting className="text-xl mx-auto mb-1" />
              <p className="">Settings</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
