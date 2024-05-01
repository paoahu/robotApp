import { errors } from 'com'

const { SystemError } = errors

function ottoController(action, message = '', sequenceId = null, userId) {
    let bodyData = { action: action, userId }


    if (sequenceId) {
        bodyData.sequenceId = sequenceId
    }


    if (action === 'sayHi' && message) {
        bodyData.message = message
    }

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData),
    }

    return fetch(`${import.meta.env.VITE_API_URL}/arduino/controller/ottoController`, req)
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => {
                        throw new SystemError(error.message)
                    })
                    .then(body => {

                        throw new Error(body.message)
                    })
            }
            return res.json()
        })
}

export default ottoController