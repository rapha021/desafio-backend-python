import axios from "axios"

export const api = axios.create({
  baseURL: "https://back-end-cnab.onrender.com",
  timeout: 10000,
})
