import React from "react";
import { getData } from "../../context/dataContext";
import { useBeforeUnload, useNavigate } from "react-router-dom";

const Category = () => {
  const { data } = getData();
  const navigate = useNavigate();

  // categories fetching 
  const getUniqueCategory = (data, property) => {
    let uniqueCategory = data?.map((currElem) => {
      return currElem[property];
    });
    uniqueCategory = [...new Set(uniqueCategory)];
    return uniqueCategory;
  };

  const categories = getUniqueCategory(data, "category");

  // console.log(categories);
  return <div className="bg-[#101829] w-full">
    <div className="max-w-7xl mx-auto flex flex-wrap gap-5 md:gap-4 py-6 px-4 justify-center md:justify-around items-center">
        {
            categories?.map((category,index) => {
              return <div key={index}>
                <button onClick={() => navigate(`/category/${category}`)} className="bg-gradient-to-r from-red-500 to-purple-500 px-3 py-1 uppercase text-white cursor-pointer rounded-md">{category}</button>
              </div>
            })
        }
    </div>
  </div>;
};

export default Category;
