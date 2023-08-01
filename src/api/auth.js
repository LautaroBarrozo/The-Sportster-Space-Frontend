import axios from "./axios"


export const registerUserRequest = async (user) => {
    return await axios.post(`/register`, user)
}

export const loginUserRequest = async (user) => {
    return await axios.post(`/login`, user)
}

export const verifyToken = async (user) => {
    return await axios.post('/verify', user)
}

export const addCommentRequest = async (user) => {
    return await axios.post(`/addComment`, user)
}

export const getCommentRequest = async (user) => {
    return await axios.post(`/getComments`, user)
}

export const logOutRequest = async () => {
    return await axios.post(`/logout`)
}