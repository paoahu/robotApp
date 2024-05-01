import { validate, errors } from 'com'
import session from './session'



function loginUser(email, password) {
    validate.email(email)
    validate.password(password)

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()

                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })


            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(token => {


                    const payloadB64 = token.slice(token.indexOf('.') + 1, token.lastIndexOf('.'))

                    const payloadJson = atob(payloadB64)

                    const payload = JSON.parse(payloadJson)

                    const userId = payload.sub

                    session.sessionUserId = userId

                    session.token = token


                })
        })

}

export default loginUser