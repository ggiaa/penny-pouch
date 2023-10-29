import React, { useEffect, useState } from "react";

import useStore from "../../store/store";
import DinamicIcon from "../utils/DinamicIcon";

function CategoriesSetting() {
  // modal show status
  const [subCategoryModalShow, setSubCategoryModalShow] = useState(false);
  // current editing sub category
  const [editedCategoryItem, setEditedCategoryItem] = useState();
  const [editedSubCategoryIndex, setEditedSubCategoryIndex] = useState(null);
  const [subCategoryInput, setSubCategoryInput] = useState("");

  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryType, setCategoryType] = useState("expense");

  // NC
  // NSC
  // EC
  // ESC
  const [saveMode, setSaveMode] = useState("");
  const modeStore = useStore();

  const categories = useStore((state) => state.categories);

  const handleSaveSubCategory = async () => {
    if (editedSubCategoryIndex != null) {
      const sub_category = selectedCategory.sub_category.map((sub, i) =>
        i == editedSubCategoryIndex ? subCategoryInput : sub
      );
      await modeStore.saveSubCategory(selectedCategory.id, sub_category, null);

      setSubCategoryModalShow(false);
      setSubCategoryInput("");
      setEditedSubCategoryIndex(null);
    } else {
      await modeStore.saveSubCategory(
        selectedCategory.id,
        "",
        subCategoryInput
      );
      setSubCategoryModalShow(false);
      setSubCategoryInput("");
      setEditedSubCategoryIndex(null);
    }

    // console.log(sub_category);
    // console.log(editedCategoryItem);
    // console.log(selectedCategory);
  };

  const handleDeleteSubCategories = async (category, index) => {
    await modeStore.deleteCategory(category, index);
  };

  const handleAddSubCategory = () => {
    setSubCategoryModalShow(true);
  };

  const handleEditSubCategory = (category, index) => {
    // console.log(category.sub_category[index]);
    setEditedSubCategoryIndex(index);
    setSubCategoryModalShow(true);
    setSubCategoryInput(category.sub_category[index]);
    // setEditedCategoryItem(category);
  };

  const handleCloseModalSubCategory = (e) => {
    if (e.target == e.currentTarget) {
      setSubCategoryModalShow(false);
      // setSelectedCategory("");
      setSubCategoryInput("");
    }
  };

  useEffect(() => {
    if (!selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    modeStore.fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-2 divide-x h-full w-full p-4">
      <div>
        <div className="mb-2 flex justify-between">
          <p className="font-semibold text-sm">Category</p>
          <button className="bg-blue-400 text-white px-8 rounded flex justify-center">
            +
          </button>
        </div>
        <div className="divide-y">
          {categories?.map((category) => (
            <div
              className="grid grid-cols-12 text-sm hover:bg-blue-100 p-2 cursor-pointer"
              key={category.id}
              onClick={() => setSelectedCategory(category)}
            >
              <div
                className={`bg-green-600 rounded-full py-2 w-8 h-8 aspect-square my-auto flex items-center justify-center text-white`}
              >
                <DinamicIcon
                  size="text-xl"
                  iconName={category.icon ?? "AiOutlineQuestion"}
                />
              </div>
              <div className=" ml-4 col-span-10 align-middle flex justify-center flex-col h-full">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-2">
        <div className="mb-2 flex justify-between">
          <p className="font-semibold text-sm">Sub category</p>
          <button
            className="bg-blue-400 text-white px-8 rounded flex justify-center"
            onClick={handleAddSubCategory}
          >
            +
          </button>
        </div>
        <div className="divide-y">
          {selectedCategory?.sub_category &&
            selectedCategory.sub_category.map((sub, index) => (
              <div
                className="grid grid-cols-12 text-sm hover:bg-blue-100 py-[0.88rem] group relative overflow-hidden"
                key={index}
              >
                <div className="ml-4 col-span-10 align-middle flex justify-center flex-col h-full">
                  {sub}
                </div>
                <div className="absolute group-hover:right-0 transition-all duration-500 transform translate-x-0 ease -right-40 flex h-full top-0">
                  <div
                    className="cursor-pointer bg-red-400 px-4 flex flex-col justify-center h-full top-0"
                    onClick={() =>
                      handleDeleteSubCategories(selectedCategory, index)
                    }
                  >
                    hapus
                  </div>
                  <div
                    className="cursor-pointer bg-sky-400 px-4 flex flex-col justify-center h-full top-0"
                    onClick={() =>
                      handleEditSubCategory(selectedCategory, index)
                    }
                  >
                    Edit
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add sub Category */}
      <div
        className={`${
          subCategoryModalShow ? "block" : "hidden"
        } absolute w-screen h-screen left-0 top-0 bg-black bg-opacity-40 z-10 flex flex-col justify-center items-center`}
        onClick={handleCloseModalSubCategory}
      >
        <div className="bg-white w-fit p-8 flex gap-x-4 rounded">
          <input
            className="input-style w-64"
            value={subCategoryInput}
            onChange={(e) => setSubCategoryInput(e.target.value)}
          />
          <button
            className="bg-sky-400 h-full rounded px-4"
            onClick={handleSaveSubCategory}
          >
            Save
          </button>
          <button
            className="bg-red-400 h-full rounded px-4"
            onClick={handleCloseModalSubCategory}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoriesSetting;
