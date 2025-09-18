import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({});
  const [openDropDown, setOpenDropDown] = useState(false);
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      // console.log(pos);
      const { latitude, longitude } = pos.coords;
      //   console.log(latitude, longitude);

      const API_KEY = import.meta.env.VITE_API_KEY;

      const url = `https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const location = await axios.get(url);
        // console.log(location.data.address);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setOpenDropDown(false);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <LocationContext.Provider
      value={{ location, setLocation, openDropDown, setOpenDropDown }}
    >
      {children}
    </LocationContext.Provider>
  );
};
