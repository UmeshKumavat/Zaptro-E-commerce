import React, { useEffect, useState } from "react";
import { getData } from "../context/dataContext";
import FilterSection from "../components/UI/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../components/UI/ProductCard";
import Pagination from "../components/UI/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../components/UI/MobileFilter";

const Product = () => {
  const { data } = getData();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior:"smooth"
    })
  }, [])
  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1);
    setOpenFilter(false)
  };
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setPage(1);
    setOpenFilter(false)

  };

  const handleResetFilter = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange([0, 5000]);
    setOpenFilter(false)
  };

  const filteredData = data?.filter((product) => {
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (selectedBrand === "All" || product.brand === selectedBrand) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo({
      top: 0,
      behavior:"smooth"
    })
  };

  const dynamicPageCount = Math.ceil(filteredData?.length / 8);
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <MobileFilter 
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleInputSearch={handleInputSearch}
              handleCategoryChange={handleCategoryChange}
              handleBrandChange={handleBrandChange}
              handleResetFilter={handleResetFilter}/>
        {data?.length > 0 ? (
          <div className="flex gap-8">
            <FilterSection
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleInputSearch={handleInputSearch}
              handleCategoryChange={handleCategoryChange}
              handleBrandChange={handleBrandChange}
              handleResetFilter={handleResetFilter}
            />
            {filteredData.length > 0 ? (
              <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-7 mt-10">
                  {filteredData
                    ?.slice(page * 8 - 8, page * 8)
                    .map((product, index) => {
                      return <ProductCard key={product.id} product={product} />;
                    })}
                </div>

                {/* pagination component */}
                <Pagination
                  page={page}
                  setPage={setPage}
                  pageHandler={pageHandler}
                  dynamicPageCount={dynamicPageCount}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center md:w-[900px] md:h-[600px] mt-10">
                <Lottie animationData={notfound} classID="w-[500px]" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
