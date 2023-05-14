import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api";

export const axiosBase = axios.create({ baseURL });
