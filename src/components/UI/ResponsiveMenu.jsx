import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();
  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 h-screen w-[75%] bg-white flex-col justify-between px-8 pb-6 pt-16 text-black rounded-r-xl shadow-md transition-all md:hidden`}
    >
      <div>
        <div className="flex items-center justify-start gap-3">
          {user ? (
            <UserButton className="w-[50px] h-[50px]" />
          ) : (
            <FaUserCircle className="w-[50px] h-[50px]" />
          )}
          <div>
            <h1>Hello,{user?.fullName}</h1>
            <h1 className="text-sm text-slate-500">Premium User</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold ">
            <li>
              <Link
                to={"/"}
                className="cursor-pointer"
                onClick={() => setOpenNav(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/products"}
                className="cursor-pointer"
                onClick={() => setOpenNav(false)}
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="cursor-pointer"
                onClick={() => setOpenNav(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                className="cursor-pointer"
                onClick={() => setOpenNav(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-10">
            <SignedOut>
              <SignInButton className="bg-red-500 px-3 py-1 rounded-md cursor-pointer text-white font-semibold" />
            </SignedOut>
            <SignedIn>
              {/* <UserButton />  */}
            </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
