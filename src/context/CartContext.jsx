import { act, createContext, useContext, useState } from "react";
import { getData } from "./dataContext";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const addToCart = (product) => {
    const itemInCartExist = cartItem?.find(
      (currItem) => currItem.id === product.id
    );
    if (itemInCartExist) {
      // increase quantity if already in cart
      const updatedCart = cartItem?.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updatedCart);
      toast.info("Product Quantity Increased!")
    } else {
      // add new item with quantity 1
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product is Added to Cart!")

    }
    // console.log(cartItem);

};

const updateQuantity = (productId, action) => {
    const cartWithQty = cartItem?.map((item) => {
        if(item.id === productId){
            let newUnit = item.quantity
            if(action === "increase"){
                newUnit = newUnit + 1
                toast.success("Quantity Increased!")
            }else if(action === "decrease"){
                newUnit = newUnit - 1 
                toast.success("Quantity Decreased!")
            }
            return newUnit > 0 ? {...item, quantity: newUnit} : null
        }
        return item;
    }).filter(item => item != null) //remove item with quantity 0 

    setCartItem(cartWithQty)
}
const deleteItem = (productId) => {
    setCartItem(cartItem?.filter((item)=> item.id !== productId))
    toast.error("Product Removed From Cart!")
}
  return (
    <CartContext.Provider value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
