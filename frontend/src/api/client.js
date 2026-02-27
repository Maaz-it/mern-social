

import axios from "axios"

import AsyncStorage from "@react-native-async-storage/async-storage";


const api = axios.create({
    baseURL: "http://localhost:4000/api/",
})


api.interceptors.request.use(async (config)=>{
    const token = await AsyncStorage.getItem("token");

    if (!config.headers) {
        config.headers = {}
    }

    if (token) {   // ✅ correct condition
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request HEader" , config.headers)
    return config;
});

export default api;