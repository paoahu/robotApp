import { validate, errors } from 'com'
import session from './session'
const { SystemError } = errors

function deleteSequence(sequenceId) {
    validate.id(sequenceId, 'sequence id')

    const req = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session.token}`
        }
    }

    return fetch(`${import.meta.env.VITE_API_URL}/arduino/controller/ottoController/${sequenceId}`, req)

        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })


            }


        })


}

export default deleteSequence