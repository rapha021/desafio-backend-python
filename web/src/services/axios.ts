import axios from "axios"

export const api = axios.create({
  baseURL: "https://cnab-rei-delas-bullet.onrender.com",
  timeout: 10000,
})
