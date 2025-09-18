import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  //   console.log(product);
  const navigate = useNavigate();
  const { id, image, title, price } = product;
  const {addToCart} = useCart();
  return (
    <div className="border border-gray-100 rounded-2xl hover:scale-102 hover:shadow-2xl cursor-pointer transition-all duration-300  h-max overflow-hidden">
      <img
        src={image}
        alt={title}
        className="bg-gray-100 aspect-square"
        onClick={() => navigate(`/products/${id}`)}
      />
      <div className="p-2">
        <h1 className="line-clamp-2 font-semibold p-1">{title}</h1>
        <p className="font-bold text-lg text-gray-800 my-1">${price}</p>
        <button onClick={() => addToCart(product)} className="bg-red-500 text-lg text-white w-full p-2 md:px-3 md:py-2 cursor-pointer rounded-md flex gap-2 items-center justify-center font-semibold">
          <IoCartOutline className="w-6 h-6" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
