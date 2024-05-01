
import { validate, errors } from 'com'

const { SystemError } = errors

function arduinoLCD(message) {

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })

    }

    return fetch(`${import.meta.env.VITE_API_URL}/arduino/controller/lcd`, req)
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

                        throw new errors[body.error](body.message)
                    })
            }

            return res.json()
        })
}

export default arduinoLCD