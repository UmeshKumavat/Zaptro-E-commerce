import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";

import { LocationContext } from "../../context/LocationContext";

const AppLayout = () => {

    const {location, getLocation, openDropDown, setOpenDropDown} = useContext(LocationContext)
  return (
    <div>
      <Navbar location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
