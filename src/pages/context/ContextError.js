import React, { createContext, useState } from 'react'
import { isEmpty, showError, isNameValid, clearError, isEmailValid, isPasswordValid, isConfirmValid, isLoginInfoValid, isCommentInputValid } from '../js/utils'

export const ErrorContext = createContext()



const ContextError = ({ children }) => {
    const [Error, setError] = useState(false)
    let users = JSON.parse(localStorage.getItem('users')) || []

    const saveActiveUser = (element) => {
        localStorage.setItem('activeUser', JSON.stringify(element))
    }
    // const userName = document.getElementById("userName")
    // const userEmail = document.getElementById("userEmail")
    // const userPassword = document.getElementById("userPassword")
    // const userConfirmPassword = document.getElementById("userConfirmPassword")

    // const loginUserEmail = document.getElementById("loginEmail")
    // const loginUserPassword = document.getElementById("loginPassword")

    // const commentInput = document.getElementById("comment-input")

    const isLoginInfoValid = (userInfoEmail, userInfoPassword) => {
        // console.log(userInfoPassword);


        let isValid = false

        for (let i = 0; i < localStorage.length; i++) {


            let clave = localStorage.key(i)
            let user = JSON.parse(localStorage.getItem(clave));

            users.forEach(e => {
                if (e.email === userInfoEmail && e.password === userInfoPassword) {
                    isValid = true
                    saveActiveUser(e)
                }
            });
        }

        return isValid
    }


    const checknameInput = (registerName) => {
        let isValid = false;

        // const inputContent = input.value.trim()

        if (isEmpty(registerName)) {
            setError(true)
        } else if (!isNameValid(registerName)) {
            setError(true)
            alert("nombre de usuario incorrecto no se aceptan ni espacios ni numeros")
        } else {
            setError(false)
            isValid = true
        }

        return isValid
    }


    const checkEmailInput = async (userEmail) => {
        let isValid = false

        // const inputContent = input.value.trim()

        if (isEmpty(userEmail)) {
            setError(true)
        } else if (!isEmailValid(userEmail)) {
            setError(true)
        } else {
            setError(false)
            isValid = true
        }

        return isValid
    }

    const checkPasswordInput = (registerPassword) => {
        let isValid = false

        // const inputContent = input.value.trim()

        if (isEmpty(registerPassword)) {
            setError(true)
        } else if (!isPasswordValid(registerPassword)) {
            setError(true)
            alert("Contraseña incorrecta se requiere un caracter especial, una mayuscula y numeros")
        } else {
            setError(false)
            isValid = true
        }

        return isValid
    }

    const checkConfirmPassword = (registerPassword, registerConfirmPassword) => {
        let isValid = false

        // const inputPasswordContent = inputPassword.value.trim()
        // const inputConfirmContent = inputConfirm.value.trim()

        if (isEmpty(registerConfirmPassword)) {
            setError(true)
        } else if (!isConfirmValid(registerPassword, registerConfirmPassword)) {
            setError(true)
        } else {
            setError(false)
            isValid = true
        }

        return isValid
    }

    const checkLoginEmail = (userEmail, userPassword) => {
        let isValid = false

        // console.log(loginEmailInput);
        // const loginEmailContent = loginEmailInput.value.trim()
        // const loginPasswordContent = loginPasswordInput.value.trim()

        if (isEmpty(userEmail)) {
            setError(true)
        } else {
            setError(false)
            isValid = true
        }

        return isValid
    }

    const checkLoginPassword = (loginEmailInput, loginPasswordInput) => {
        let isValid = false

        // const loginEmailContent = loginEmailInput.value.trim()
        // const loginPasswordContent = loginPasswordInput.value.trim()

        if (isEmpty(loginPasswordInput)) {
            setError(true)
        } else {
            setError(false)
            isValid = true
        }

        return isValid
    }

    const checkComment = (comment) => {

        let isValid = false

        // const commentInputContent = comment.value.trim()

        if (isEmpty(comment)) {
            setError(true)
        } else if (!isCommentInputValid(comment)) {
            setError(true)
        } else {
            setError(false)
            isValid = true
        }

        return isValid
    }

    const formValidation = (registerName, registerEmail, registerPassword, registerConfirmPassword) => {
        const isValidName = checknameInput(registerName)
        const isEmailValid = checkEmailInput(registerEmail)
        const isPasswordValid = checkPasswordInput(registerPassword)
        const isConfirmPasswordValid = checkConfirmPassword(registerPassword, registerConfirmPassword)

        return (
            isValidName && isEmailValid && isPasswordValid && isConfirmPasswordValid
        )
    }

    const loginValidation = (loginUserEmail, loginUserPassword) => {
        const isLoginEmailValid = checkLoginEmail(loginUserEmail, loginUserPassword)
        const isLoginPasswordValid = checkLoginPassword(loginUserEmail, loginUserPassword)

        return (
            isLoginEmailValid && isLoginPasswordValid
        )
    }

    const CommentValidation = (Comment) => {
        const isCommentValid = checkComment(Comment)

        return isCommentValid

    }

    return (
        <ErrorContext.Provider value={{ Error, setError, loginValidation, formValidation, CommentValidation }}>{children}</ErrorContext.Provider>
    )
}

export default ContextError