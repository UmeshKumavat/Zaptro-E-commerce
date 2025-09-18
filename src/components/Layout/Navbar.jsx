import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { HiMenuAlt1, HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "../UI/ResponsiveMenu";

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {
  const { cartItem } = useCart();
  const [openNav, setOpenNav] = useState(false);

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  return (
    <div className="py-3 shadow-2xl bg-white px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* logo section  */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="text-3xl font-bold">
              <span className="text-red-500 font-serif">Z</span>aptro
            </h1>
          </Link>

          {/* location section */}
          <div className="md:flex gap-1 cursor-pointer items-center text-gray-700 hidden">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.county}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown
              onClick={toggleDropDown}
              className="w-[24px] h-[24px]"
            />
          </div>
          {openDropDown ? (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 border-gray-100 rounded-md p-5 transition-all duration-500">
              <h1 className="font-semibold text-xl mb-4 flex justify-between items-center">
                Change Location
                <span className="cursor-pointer">
                  <CgClose
                    onClick={toggleDropDown}
                    className="transition-all duration-500"
                  />
                </span>
              </h1>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 cursor-pointer font-semibold"
                onClick={getLocation}
              >
                Detect my location
              </button>
            </div>
          ) : null}
        </div>

        {/* menu section  */}
        <nav className="flex gap-7 items-center">
          <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-3 border-red-500 transition-all duration-75"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/products"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-3 border-red-500 transition-all duration-75"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-3 border-red-500 transition-all duration-75"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-3 border-red-500 transition-all duration-75"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
          {/* cart section  */}
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="w-7 h-7 " />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-2 text-white">
              {cartItem.length}
            </span>
          </Link>

          {/* user Login/Signup section  */}
          <div className="md:block hidden">
            <SignedOut>
              <SignInButton className="bg-red-500 px-3 py-1 rounded-md cursor-pointer text-white font-semibold" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {openNav ? (
            <HiMenuAlt3 onClick={() => setOpenNav(false)} className="h-7 w-7 md:hidden" />
          ) : (
            <HiMenuAlt1 onClick={() => setOpenNav(true)} className="h-7 w-7 md:hidden" />
          )}
        </nav>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  );
};

export default Navbar;
