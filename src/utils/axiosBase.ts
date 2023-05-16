import axios from "axios";

const baseURL = "/api";

export const axiosBase = axios.create({ baseURL });
