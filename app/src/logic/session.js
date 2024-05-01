const session = {


    set sessionUserId(userId) {
        if (userId)
            sessionStorage.userId = userId
        else
            delete sessionStorage.userId
    },

    get sessionUserId() {
        return sessionStorage.userId ? sessionStorage.userId : null

    },

    set token(token) {
        if (token)
            sessionStorage.token = token
        else
            delete sessionStorage.token
    },

    get token() {
        return sessionStorage.token ? sessionStorage.token : null
    }



}

export default session