import api from "./client";


export  const loginApi = (data) => api.post("auth/login", data)
export const signupApi = (data) => api.post("auth/signup" , data)


// forgot password apis 

export const sendotp = (data) => api.post("auth/sendotp" ,data)

export const verifyotp = (data) => api.post("auth/verifyotp", data)

export const getme = (data) => api.get("user/Me" , data)

export const changepassword = (data) => api.post("auth/resetpassword", data)

export const UpdateProfile = (data) => api.put("user/edit-profile", data)