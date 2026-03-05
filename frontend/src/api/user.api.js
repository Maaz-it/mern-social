
import api from "./client";


export const getCurrentUSer = () => {
    return api.get("user/current")
}



export const getMydata = () =>{
    return api.get("user/Me")
}