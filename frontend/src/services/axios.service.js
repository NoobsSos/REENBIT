import axios from "axios";
// import { baseURL } from "../configs/urls";

const axiosService = axios.create({ baseURL: "http://localhost:5000" });

export default axiosService;