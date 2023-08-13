import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import DinamicIcon from "../../components/utils/DinamicIcon";
import { AiOutlineClose } from "react-icons/ai";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import * as firebase from "firebase/firestore";
import useStore from "@/app/store/store";

function AddNewTransaction({ modalOpen, categories, setModalOpen }) {
  const store = useStore();

  const [category, setCategory] = useState();
  const [categoryModal, setCategoryModal] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState(1);
  const [modalSubCategory, setModalSubCategory] = useState(false);

  const [categoryText1, setcategoryText1] = useState("Uncategorized");
  const [categoryText2, setcategoryText2] = useState("Uncategorized");
  const [amount, setamount] = useState("");
  const [note, setnote] = useState("");
  // const [iconName, setIconName] = useState("");
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateChange = (newValue) => {
    console.log("newValue:", newValue);
    setDate(newValue);
  };

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
      resetForm();
      return;
    }
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    if (category.sub_category) {
      setModalSubCategory(true);

      setcategoryText1(category.name);
    } else {
      setcategoryText1(category.is_income ? "Income" : "Expense");
      setcategoryText2(category.name);
      setCategoryModal(false);
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    setcategoryText2(subCategory);
    setModalSubCategory(false);
    setCategoryModal(false);
  };

  const handleSave = async () => {
    await store.addTransaction({
      account: "",
      amount: amount,
      date: new Date(date.startDate),
      note: note,
      category: categoryText1,
      sub_category: categoryText2,
      is_expense: category.is_expense,
      is_income: category.is_income,
      icon: category.icon,
    });

    setModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setcategoryText1("Uncategorized");
    setcategoryText2("Uncategorized");
    setamount("");
    setnote("");
    setDate({ startDate: new Date(), endDate: new Date() });
    setCategory();
    setActiveCategoryTab(1);
  };

  return (
    <div
      className={`${
        modalOpen ? "block" : "hidden"
      } fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center`}
      onClick={(e) => handleClose(e)}
    >
      <div className="bg-white w-5/12 relative rounded-md p-8">
        <p className="mb-5 text-center font-medium text-lg">New Transaction</p>

        {/* Add Transaction Form */}
        <div className="flex flex-col gap-y-4">
          <input
            value={categoryText1 + " > " + categoryText2}
            type="text"
            readOnly
            placeholder="Category"
            className={`input-style ${
              categoryText1 == "Uncategorized" ? "text-slate-400" : "text-black"
            }`}
            onClick={() => setCategoryModal(true)}
          />
          <input
            type="text"
            placeholder="Amount"
            className="input-style"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Note"
            className="input-style"
            value={note}
            onChange={(e) => setnote(e.target.value)}
          />
          <Datepicker
            inputClassName="input-style w-full text-black"
            placeholder="Transaction Date"
            useRange={false}
            asSingle={true}
            value={date}
            onChange={handleDateChange}
          />
          <button
            className="bg-blue-600 rounded py-2 text-slate-50 font-medium"
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        {/* CATEGORY */}
        <div
          className={`bg-white w-full absolute overflow-hidden -bottom-4 left-0 flex flex-col transform transition-all duration-300 ease-in ${
            categoryModal ? "-translate-y-4 h-full p-2" : "h-0"
          }`}
        >
          <div className="flex justify-center relative mb-4 mt-4">
            <div
              onClick={() => setActiveCategoryTab(1)}
              className="cursor-pointer w-28"
            >
              <h1
                className={`text-center ${
                  activeCategoryTab == 1
                    ? "text-blue-600 font-medium"
                    : "text-black"
                }`}
              >
                Expense
              </h1>
              <div
                className={`h-[3px] bg-blue-500 transition-all duration-500 ml-auto mt-1 ${
                  activeCategoryTab == 1 ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
            <div
              onClick={() => setActiveCategoryTab(2)}
              className="cursor-pointer w-28"
            >
              <h1
                className={`text-center ${
                  activeCategoryTab == 2
                    ? "text-blue-600 font-medium"
                    : "text-black"
                }`}
              >
                Income
              </h1>
              <div
                className={`h-[3px] bg-blue-500 transition-all duration-500 mr-auto mt-1 ${
                  activeCategoryTab == 2 ? "w-full" : "w-0"
                }`}
              ></div>
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
                          <DinamicIcon
                            size="text-2xl"
                            iconName={category.icon}
                          />
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
              {category?.sub_category?.map((subCategory, index) => (
                <div
                  className="text-center"
                  key={index}
                  onClick={() => handleSubCategoryClick(subCategory)}
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
  );
}

export default AddNewTransaction;
