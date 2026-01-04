// import axios from "axios";

// const api = axios.create({
//     baseURL:"https://fakestoreapi.in/api"
// })

// //fetching all products 

// export const fetchProducts =  () => {
//     return api.get("/products?limit=150")
// }

// export const fetchSingleProduct = (id) => {
//     return api.get(`/products/${id}`)
// }
// export const fetchCategoryWiseProducts = (category) => {
//     return api.get(`/products/category?type=${category}`)
// }



// import products from "../data/products.json";

// export const fetchProducts = () => {
//   return Promise.resolve({
//     data: products
//   });
// };

// export const fetchSingleProduct = (id) => {
//   const product = products.find((item) => item.id === Number(id));

//   return Promise.resolve({
//     data: product
//   });
// };

// export const fetchCategoryWiseProducts = (category) => {
//   const filteredProducts = products.filter(
//     (item) => item.category === category
//   );

//   return Promise.resolve({
//     data: filteredProducts
//   });
// };

import productsData from "../data/products.json";

// helper (normalize)
const getProductsArray = () => {
  if (Array.isArray(productsData)) return productsData;
  if (Array.isArray(productsData?.products)) return productsData.products;
  return [];
};

export const fetchProducts = () => {
  return Promise.resolve({
    data: getProductsArray(),
  });
};

export const fetchSingleProduct = (id) => {
  const products = getProductsArray();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  return Promise.resolve({
    data: product || null,
  });
};

export const fetchCategoryWiseProducts = (category) => {
  const products = getProductsArray();

  const filtered =
    category === "All"
      ? products
      : products.filter((item) => item.category === category);

  return Promise.resolve({
    data: filtered,
  });
};

