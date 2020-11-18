const axios = require("axios").default;

export const API = axios.create({
  baseURL: "http://localhost:4000/",
});
