import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryWiseProducts } from "../api/productsData";
import Loading from "../assets/Loading4.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../components/UI/ProductListView";

const CategoryProduct = () => {
  const [categorizedProducts, setCategorizedProducts] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const productCategory = params.category;
    console.log(productCategory);

  const getCategoryWiseProducts = async () => {
    try {
      const res = await fetchCategoryWiseProducts(productCategory);
      //   console.log(res.data.products);
      const data = res?.data?.products || [];
      setCategorizedProducts(data);
    } catch (error) {
      console.log(error);
      setCategorizedProducts([])
    }
  };
  useEffect(() => {
    if (productCategory) {
      getCategoryWiseProducts();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [productCategory]);

  return (
    <div>
      {categorizedProducts.length > 0 ? (
        <div className="max-w-6xl mx-auto my-10 px-4 overflow-x-hidden">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 mb-3 rounded-md cursor-pointer"
          >
            <ChevronLeft />
            Back
          </button>
          {categorizedProducts?.map((product, index) => {
            return <ProductListView key={product.id} product={product} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
