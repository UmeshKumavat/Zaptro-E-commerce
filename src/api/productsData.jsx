import axios from "axios";

const api = axios.create({
    baseURL:"https://fakestoreapi.in/api"
})

//fetching all products 

export const fetchProducts =  () => {
    return api.get("/products?limit=150")
}

export const fetchSingleProduct = (id) => {
    return api.get(`/products/${id}`)
}
export const fetchCategoryWiseProducts = (category) => {
    return api.get(`/products/category?type=${category}`)
}