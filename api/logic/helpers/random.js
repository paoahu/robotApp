function name() {
    return `name-${Math.random()}`
}

function email() {
    return `e-${Math.random()}@mail.com`
}

function password() {
    return `password-${Math.random()}`
}

function image() {
    return `image-${Math.random()}`
}

function text() {
    return `text-${Math.random()}`
}

function robot() {
    return `robot-${Math.random()}`
}

const random = {
    name,
    email,
    password,
    image,
    text,
    robot
}

export default random