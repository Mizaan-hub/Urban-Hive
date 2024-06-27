import axios from "axios";

const ApiRequest = axios.create({
    baseURL: "http://localhost:6969/api",
    withCredentials: true
})

export default ApiRequest