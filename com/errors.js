class NotFoundError extends Error {
    constructor(message) {

        super(message)

        this.name = this.constructor.name
    }
}

class SystemError extends Error {
    constructor(message) {

        super(message)

        this.name = this.constructor.name
    }
}

class ContentError extends Error {
    constructor(message) {

        super(message)

        this.name = this.constructor.name
    }
}

class DuplicityError extends Error {
    constructor(message) {

        super(message) // podemos ponerle el message aqui?

        this.name = this.constructor.name
    }
}

class AuthenticateError extends Error {
    constructor(message) {

        super(message)

        this.name = this.constructor.name
    }
}

class CredentialsError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class TokenError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class PermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}


class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}


export {  //esto es un bucket
    NotFoundError,
    SystemError,
    ContentError,
    DuplicityError,
    AuthenticateError,
    CredentialsError,
    TokenError,
    PermissionError,
    ValidationError
}

const errors = { // esto un objeto
    NotFoundError,
    SystemError,
    ContentError,
    DuplicityError,
    CredentialsError,
    TokenError,
    PermissionError,
    ValidationError
}

export default errors