import React, { useContext } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebook, LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining, MdOutlineDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { LocationContext } from "../context/LocationContext";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png"
const Cart = () => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const {user} = useUser();
  // console.log(user);
  const navigate = useNavigate();
  const {location, getLocation} = useContext(LocationContext);
  const totalPrice = cartItem?.reduce((total, item) => {
     return total + (item.price * item.quantity)
  },0 )
  const handlingCharge = 5
  const grandTotal = totalPrice + handlingCharge
  // console.log(location);
  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>
          <div>
            <div className="mt-10">
              {cartItem?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="bg-gray-100 p-5 flex justify-between items-center rounded-md mt-3 w-full shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-md"
                      />
                      <div>
                        <h1 className="md:w-[300px] line-clamp-2 font-semibold">
                          {item.title}
                        </h1>
                        <p className="text-red-500 font-semibold">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-500 text-white font-bold rounded-md flex items-center gap-4 p-2 text-lg">
                      <button className="cursor-pointer text-xl" onClick={() => updateQuantity(item.id, "decrease")}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, "increase")} className="cursor-pointer">+</button>
                    </div>
                    <span onClick={() => deleteItem(item.id)} className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl cursor-pointer">
                      <FaRegTrashAlt className="w-6 h-6 text-red-500" />
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
              {/* form section  */}
              <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Full Name: </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your Name"
                    className="bg-white p-2 rounded-md border-2 border-gray-200 outline-none"
                    value={user?.fullName}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Address: </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter your Address"
                    className="bg-white p-2 rounded-md border-2 border-gray-200 outline-none"
                    value={location?.county}
                  />
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="">State: </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="Enter your State"
                      className="w-full bg-white p-2 rounded-md border-2 border-gray-200 outline-none"
                      value={location?.state}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="">Post Code: </label>
                    <input
                      type="text"
                      name="postCode"
                      id="postCode"
                      placeholder="Enter Post Code"
                      className="w-full bg-white p-2 rounded-md border-2 border-gray-200 outline-none"
                      value={location?.postcode}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="">Country: </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Enter your Country"
                      className="w-full bg-white p-2 rounded-md border-2 border-gray-200 outline-none"
                      value={location?.country}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="">Phone Number: </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Enter your Phone Number"
                      className="w-full bg-white p-2 rounded-md border-2 border-gray-200 outline-none"
                    />
                  </div>
                </div>
                <button className="bg-red-500 cursor-pointer rounded-md text-white font-semibold px-3 mt-3 py-1">
                  Submit
                </button>
                <div className="flex flex-col gap-5 items-center justify-center w-full  text-gray-700">
                  <span className="block mb-4"> -------OR------- </span>
                  <button onClick={() => getLocation()} className="bg-red-500 cursor-pointer rounded-md text-white font-semibold px-3  py-1">
                    Detect Location
                  </button>
                </div>
              </div>

              {/* billing section  */}
              <div className="bg-white shadow-xl rounded-md border border-gray-100 p-7 mt-4  space-y-2 h-max">
                  <h1 className="text-gray-800 font-bold text-xl">Bill Details</h1>
                  <div className="flex justify-between items-center">
                    <h1 className="flex gap-1 text-gray-700 items-center"><span><LuNotebookText /></span>Items total</h1>
                    <p>${totalPrice}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="flex gap-1 text-gray-700 items-center"><span><MdDeliveryDining /></span>Delivery Charge</h1>
                    <p className="text-red-500 font-semibold flex gap-1"><span className="text-gray-600 line-through">$25</span>FREE</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="flex gap-1 text-gray-700 items-center"><span><GiShoppingBag /></span>Handling Charge</h1>
                    <p className="text-red-500 font-semibold">${handlingCharge}</p>
                  </div>

                  <hr className="text-gray-200 mt-2"/>
                  <div className="flex justify-between items-center mt-4">
                    <h1 className="text-lg font-semibold">GRAND TOTAL</h1>
                    <p className="text-lg font-semibold">${grandTotal}</p>
                  </div>
                  <div>
                    <h1 className="font-semibold text-gray-700 mb-3 mt-7">Apply Promo Code</h1>
                    <div className="flex items-center gap-3">
                      <input type="text" name="promoCode" id="promoCode" placeholder="Enter Promo Code" className="border-2 border-gray-200 p-2 rounded-md w-full" />
                      <button className="bg-red-500 cursor-pointer rounded-md text-white font-semibold px-4 py-2">Apply</button>
                    </div>
                  </div>
                  <button className="bg-red-500 w-full cursor-pointer mt-4 rounded-md text-white font-semibold px-4 py-2">Proceed To Checkout</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center  h-[600px]">
            <h1 className="text-red-500/80 text-5xl font-bold text-muted">Oh noo! Your Cart is Empty...</h1>
            <img src={emptyCart} alt="" className="w-[400px]" />
            <button onClick={() => navigate("/products")} className="bg-red-500 text-white rounded-md cursor-pointer px-4 py-2 font-semibold">Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
