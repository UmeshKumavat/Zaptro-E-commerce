import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../api/productsData";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/UI/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const params = useParams();
  // console.log(params);
  const { addToCart } = useCart();
  // const [productQty ,setProductQty] = useState(1)
  // const [singleProduct, setSingleProduct] = useState({});
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const id = params.id;
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const getSingleProductData = async () => {
    try {
      const res = await fetchSingleProduct(id);
      //   console.log(res.data.product);
      // const product = res.data.product;
      const product = res.data;
      setSingleProduct(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProductData();
  }, []);

  const originalPrice = singleProduct?.discount
    ? Math.round(
        singleProduct.price +
          singleProduct.price * (singleProduct.discount / 100)
      )
    : singleProduct?.price;

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={singleProduct.title} />
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* product image  */}
            <div className="w-full">
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            {/* single product details  */}
            <div className="flex flex-col gap-6">
              <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                {singleProduct.title}
              </h1>
              {/* brand category and model  */}
              <div className="text-gray-700 uppercase">
                {singleProduct?.brand} /{singleProduct?.category} /
                {singleProduct?.model}
              </div>

              {/* price and discounted price  */}
              <p className="text-xl text-red-500 font-bold flex items-center gap-2">
                ${singleProduct.price}{" "}
                <span className="text-gray-700 line-through">
                  $
                  {singleProduct.discount ? originalPrice : singleProduct.price}{" "}
                </span>{" "}
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm ml-3">
                  {singleProduct.discount ? singleProduct.discount : "0"}%
                  discount
                </span>
              </p>

              {/* product description  */}
              <p className="text-gray-600">{singleProduct.description}</p>

              {/* product Quantity selector */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="quantity"
                  className="text-sm font-semibold text-gray-700"
                >
                  Quantity:{" "}
                </label>
                <input
                  type="number"
                  name="quantity"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  id="quantity"
                  className="px-3 py-1  border border-gray-300 w-20 rounded-lg focus:outline-2 focus:outline-red-500"
                />
              </div>

              {/* add to cart button  */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => addToCart(singleProduct, quantity)}
                  className="bg-red-500 text-lg text-white px-6 py-2 cursor-pointer rounded-md flex gap-2 items-center justify-center font-semibold"
                >
                  <IoCartOutline className="w-6 h-6" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
