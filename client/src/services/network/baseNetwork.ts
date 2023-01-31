import axios from "axios";

export const customApiInstance = axios.create({
  baseURL: "http://localhost:8080/products",
  timeout: 5000,
});
