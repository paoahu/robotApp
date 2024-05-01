import { validate, errors } from "com"
import session from "./session"

const { SystemError } = errors


function publishTutorial(title, text) {
    validate.text(title, 'title')
    validate.text(text, 'text')



    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, text })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/tutorials`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()


                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })


            }


        })
}

export default publishTutorial