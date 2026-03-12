
import api from "./client";


export const getCurrentUSer = () => {
    return api.get("user/current")
}



export const getMydata = () =>{
    return api.get("user/Me")
}


export const getallpost = () =>{
    return api.get("user/feed")
}



export const LikePost  = (postId) =>{
    console.log("Calling" , `/user/Likes/${postId}`)
    return api.post(`/user/Likes/${postId}`)
}