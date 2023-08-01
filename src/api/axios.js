import axios from "axios";

const instance = axios.create({
    baseURL: 'https://the-sportster-space-backend.onrender.com/api',
    withCredentials: true
})

export default instance