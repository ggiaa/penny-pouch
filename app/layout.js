"use client";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  AiOutlineHome,
  AiOutlineLineChart,
  AiOutlineCreditCard,
  AiOutlineSetting,
  AiOutlinePlus,
  AiOutlineClose,
} from "react-icons/ai";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./config/firebase";
import Datepicker from "react-tailwindcss-datepicker";
import DinamicIcon from "./components/DinamicIcon";

const poppins = Plus_Jakarta_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Penny Pouch",
  description: "Money Manager",
};

export default function RootLayout({ children }) {
  const segments = useSelectedLayoutSegments();
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState(1);
  const [categories, setCategories] = useState();
  const [modalSubCategory, setModalSubCategory] = useState(false);
  const [category, setCategory] = useState();

  const [categoryText1, setcategoryText1] = useState("Uncategorized");
  const [categoryText2, setcategoryText2] = useState("Uncategorized");

  console.log(categories);
  console.log(categoryModal);

  const handleClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    if (modalSubCategory) {
      setModalSubCategory(false);
      return;
    }

    if (categoryModal) {
      setCategoryModal(false);
      return;
    }

    if (modalOpen) {
      setModalOpen(false);
      return;
    }
  };

  const handleCategoryClick = (category) => {
    if (category.sub_category) {
      setCategory(category);
      setModalSubCategory(true);
    } else {
    }
  };

  const [value, setValue] = useState({
    startDate: new Date(),
    // endDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  useEffect(() => {
    const getCategories = async () => {
      const q = query(collection(db, "categories"));
      const querySnapshot = await getDocs(q);

      const filteredData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCategories(filteredData);
    };

    getCategories();
  }, []);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="h-[90vh] p-2">{children}</div>
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
              <div
                onClick={() => setModalOpen(true)}
                className="absolute bg-blue-600 p-1 right-0 left-0 top-0 bottom-0 rounded-full origin-center h-full scale-150 mx-auto aspect-square border border-slate-300 group hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 overflow-hidden"
              >
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
              <Link href="/settings">
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

        {/* MODAL */}
        <div
          className={`${
            modalOpen ? "block" : "hidden"
          } fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center`}
          onClick={(e) => handleClose(e)}
        >
          <div className="bg-white w-5/12 relative rounded-md p-8 overflow-hidden">
            <p className="mb-5 text-center font-medium text-lg">
              New Transaction
            </p>

            <div className="flex flex-col gap-y-4">
              <input
                // value={categoryText1 + " > " + categoryText2}
                type="text"
                placeholder="Category"
                className={`border border-slate-400 rounded p-2 ${
                  categoryText1 == "Uncategorized"
                    ? "text-slate-400"
                    : "text-black"
                }`}
                onClick={() => setCategoryModal(true)}
              />
              <input
                type="text"
                placeholder="Amount"
                className="border border-slate-400 rounded p-2"
              />
              <input
                type="text"
                placeholder="Note"
                className="border border-slate-400 rounded p-2"
              />
              <Datepicker
                inputClassName="border border-slate-400 rounded p-2 w-full text-black"
                placeholder="Transaction Date"
                useRange={false}
                asSingle={true}
                value={value}
                onChange={handleValueChange}
              />
              <button className="bg-blue-600 rounded py-2 text-slate-50 font-medium">
                Save
              </button>
            </div>

            {/* CATEGORY */}
            <div
              className={`bg-white w-full absolute -bottom-4 left-0 flex p-2 flex-col transform transition-all duration-300 ease-in ${
                categoryModal ? "-translate-y-4 h-full" : "h-0"
              }`}
            >
              <div className="flex justify-center relative mb-4">
                <div
                  onClick={() => setActiveCategoryTab(1)}
                  className={`px-4 py-1 cursor-pointer ${
                    activeCategoryTab == 1
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : ""
                  }`}
                >
                  Expense
                </div>
                <div
                  onClick={() => setActiveCategoryTab(2)}
                  className={`px-4 py-1 cursor-pointer ${
                    activeCategoryTab == 2
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : ""
                  }`}
                >
                  Income
                </div>
              </div>

              {/* Expense category */}
              <div
                className={`grid grid-cols-5 gap-y-4 ${
                  activeCategoryTab == 1 ? "block" : "hidden"
                }`}
              >
                {categories
                  ? categories.map(
                      (category, index) =>
                        category.is_expense && (
                          <div
                            className="text-center"
                            key={index}
                            onClick={() => handleCategoryClick(category)}
                          >
                            <div className="w-10 h-10 rounded-full bg-slate-200 border-slate-300 border mx-auto flex justify-center items-center">
                              <DinamicIcon iconName={category.icon} />
                            </div>
                            <h1 className="text-sm">{category.name}</h1>
                          </div>
                        )
                    )
                  : ""}
              </div>

              {/* Income category */}
              <div
                className={`grid grid-cols-5 gap-y-4 ${
                  activeCategoryTab == 2 ? "block" : "hidden"
                }`}
              >
                {categories
                  ? categories.map(
                      (category, index) =>
                        category.is_income && (
                          <div
                            className="text-center"
                            key={index}
                            onClick={() => handleCategoryClick(category)}
                          >
                            <div className="w-10 h-10 rounded-full bg-slate-200 border-slate-300 border mx-auto flex justify-center items-center">
                              <DinamicIcon iconName={category.icon} />
                            </div>
                            <label>{category.name}</label>
                          </div>
                        )
                    )
                  : ""}
              </div>

              {/* Sub category modal */}
              <div
                className={`${
                  modalSubCategory ? "-translate-y-4 h-full" : "h-0"
                } bg-white w-full absolute -bottom-4 left-0 flex p-2 flex-col transform transition-all duration-300 ease-in`}
              >
                <div className="flex items-center gap-x-4 mb-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => setModalSubCategory(false)}
                  >
                    <AiOutlineClose className="text-xl text-red-600" />
                  </div>
                  <h1 className="font-medium text-lg">{category?.name}</h1>
                </div>
                <div className="grid grid-cols-5 gap-y-4">
                  {category?.sub_category.map((subCategory, index) => (
                    <div
                      className="text-center"
                      key={index}
                      // onClick={() => handleCategoryClick(category)}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-500 mx-auto"></div>
                      <label>{subCategory}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
