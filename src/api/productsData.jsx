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



import products from "../data/products.json";

export const fetchProducts = () => {
  return Promise.resolve({
    data: products
  });
};

export const fetchSingleProduct = (id) => {
  const product = products.find((item) => item.id === Number(id));

  return Promise.resolve({
    data: product
  });
};

export const fetchCategoryWiseProducts = (category) => {
  const filteredProducts = products.filter(
    (item) => item.category === category
  );

  return Promise.resolve({
    data: filteredProducts
  });
};
