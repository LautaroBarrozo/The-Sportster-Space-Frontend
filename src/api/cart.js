import axios from "./axios"

export const addCartProduct = async (user) => {
    return await axios.post(`/addProduct`, user)
}

export const checkExistingProduct = async (user) => {
    return await axios.post(`/checkExistingProduct`, user)
}

export const getCartProducts = async (user) => {
    return await axios.post(`/getProducts`, user)
}

export const plusQuantity = async (user) => {
    return await axios.post(`/updatePlusProduct`, user)
}

export const minusQuantity = async (user) => {
    return await axios.post(`/updateMinProduct`, user)
}

export const deleteUserCart = async (user) => {
    return await axios.post(`/deleteCart`, user)
}
