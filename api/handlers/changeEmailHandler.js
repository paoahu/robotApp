import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from '../logic/index.js'

import { errors } from 'com'
const { NotFoundError, ContentError, CredentialsError, TokenError } = errors

export default (req, res) => {
    try {
        const token = req.headers.authorization.substring(7)
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)
        const { newEmail, newEmailConfirm, password } = req.body

        logic.changeEmailUser(userId, newEmail, newEmailConfirm, password)

            .then(() => res.status(204).send())
            .catch(error => {


                let status = 500
                if (error instanceof NotFoundError)
                    status = 404
                else if (error instanceof CredentialsError)
                    status = 401
                res.status(status).json({ error: error.constructor.name, message: error.message })

            })




    } catch (error) {
        let status = 500
        if (error instanceof ContentError || error instanceof TypeError)
            status = 406
        else if (error instanceof JsonWebTokenError) {
            status = 401
            error = new TokenError(error.message)
        }
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}
