import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchProducts } from "../api/productsData";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [data, setData] = useState();

  // data(products) fetching 
  const getProductsData = async () => {
    try {
      const res = await fetchProducts();
      //   console.log(res.data.products);
      setData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductsData();
  }, []);

  // categories fetching 
  const getUniqueCategory = (data, property) => {
    let uniqueCategory = data?.map((currElem) => {
      return currElem[property];
    });
    uniqueCategory = ["All",...new Set(uniqueCategory)];
    return uniqueCategory;
  };

  const categories = getUniqueCategory(data, "category");
  const brandData = getUniqueCategory(data, "brand")

  return (
    <DataContext.Provider value={{ data, setData, getProductsData, categories, brandData }}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);

export default DataProvider;
