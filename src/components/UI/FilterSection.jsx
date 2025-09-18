import React from "react";
import { getData } from "../../context/dataContext";

const FilterSection = ({
  search,
  setSearch,
  handleInputSearch,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  handleCategoryChange,
  handleBrandChange,
  handleResetFilter,
}) => {
  const { categories, brandData } = getData();
  return (
    <div className="bg-gray-100 mt-10 h-max p-4 rounded-md hidden md:block">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        className="bg-white p-2 rounded-md border-2 border-gray-400"
        value={search}
        onChange={handleInputSearch}
      />

      {/* category only data  */}
      <h1 className="text-xl font-semibold mt-5">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categories?.map((category, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                name={category}
                id={category}
                checked={category === selectedCategory}
                className="accent-red-500"
                value={category}
                onChange={handleCategoryChange}
              />
              <label htmlFor={category} className="uppercase cursor-pointer">
                {category}
              </label>
            </div>
          );
        })}
      </div>

      {/* brand only data */}
      <h1 className="text-xl font-semibold mt-5">Brand</h1>
      <select
        name=""
        id=""
        className="p-2 mt-3 bg-white rounded-md border-2 border-gray-200 uppercase w-full cursor-pointer"
        value={selectedBrand}
        onChange={handleBrandChange}
      >
        {brandData?.map((brand, index) => {
          return (
            <option key={index} value={brand}>
              {brand}
            </option>
          );
        })}
      </select>

      {/* price range section  */}
      <h1 className="text-xl font-semibold mt-5">Price Range</h1>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="priceRange">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          name=""
          min="0"
          max="5000"
          id="priceRange"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="accent-red-500 cursor-pointer"
        />
      </div>
      <button
        onClick={handleResetFilter}
        className="bg-red-500 px-3 py-1 text-white font-semibold rounded-md cursor-pointer mt-5"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
