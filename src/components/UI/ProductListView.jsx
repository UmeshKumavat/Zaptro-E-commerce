import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const {addToCart} = useCart();
  return (
    <div className="mt-2 space-y-4 rounded-md">
      <div className="bg-gray-100 flex gap-7 items-center p-2 rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="h-25 w-25 md:w-60 md:h-60 rounded-md cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        />
        <div className="space-y-2 overflow-x-clip
        ">
          <h1 className="font-bold text-lg md:text-xl line-clamp-3 hover:text-red-400 w-[180px] md:w-full">
            {product.title}
          </h1>
          <p className="font-semibold flex items-center text-base md:text-lg">
            $<span className="text-3xl md:text-4xl">{product.price}</span>(
            {product.discount ? product.discount : "0"}% off)
          </p>
          <p className="text-sm md:text-base">FREE delivery <span className="font-semibold">Fri, 18 Apr</span> <br />Or fastest delivery <span className="font-semibold">Tomorrow, 17 Apr</span></p>
          <button onClick={() => addToCart(product)} className="bg-red-500 cursor-pointer rounded-md font-semibold text-white px-3 py-1 hover:bg-red-600">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
