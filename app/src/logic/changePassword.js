import { validate, errors } from 'com'
import session from "./session"
const { SystemError } = errors

function changePassword(password, newPassword, repeatNewPassword) {
    validate.password(password, "password")
    validate.password(newPassword, "new password")
    validate.password(repeatNewPassword, "new password confirm")


    const req = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${String(session.token)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, newPassword, repeatNewPassword })
    }
    return fetch(`${import.meta.env.VITE_API_URL}/users/me/change-password`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {

            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })


            }



        })
}


export default changePassword