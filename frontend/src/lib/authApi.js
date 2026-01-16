import api from "./axios"

export const registerUser = async (payload) =>{
    const response = await api.post("/register",payload)
    return response.data
}

export const loginUser = async(payload) => {
    const response = await api.post("/login", payload)
    return response.data
}