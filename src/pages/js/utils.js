let users = JSON.parse(localStorage.getItem('users')) || []

const saveActiveUser = (element) => {
    localStorage.setItem('activeUser', JSON.stringify(element))
}

export const isEmpty = (userInfo) => userInfo == "";

export const isNameValid = (userInfo) => {
    const re = /^[A-Za-z]{3,}$/
    return re.test(userInfo)
}

export const isEmailValid = (userInfo) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(userInfo)
}

export const isPasswordValid = (userInfo) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    return re.test(userInfo)
}

export const isCommentInputValid = (comment) => {
    const re = /^[A-Za-z0-9À-ÿ\u00f1\u00d1\s¿?@$!¡/_-]{5,}$/
    return re.test(comment)
}

export const isConfirmValid = (userInfoPassword, userInfoConfirmPassword) => {

    let isValid = false

    if (userInfoPassword === userInfoConfirmPassword) {
        isValid = true
    }

    return isValid
}

export const isLoginInfoValid = (userInfoEmail, userInfoPassword) => {

    let isValid = false

    for (let i = 0; i < localStorage.length; i++) {


        let clave = localStorage.key(i)
        let user = JSON.parse(localStorage.getItem(clave));

        users.forEach(e => {
            if (e.email == userInfoEmail && e.password == userInfoPassword) {
                isValid = true
                saveActiveUser(e)
            }
        });
    }

    return isValid
}