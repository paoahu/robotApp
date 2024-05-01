import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from '../logic/index.js'
import { errors } from 'com'
import { SystemError } from 'com/errors.js'

const { NotFoundError, ContentError, TokenError } = errors

export default (req, res) => {

    try {
        const token = req.headers.authorization.substring(7)
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        const { title, text } = req.body
        logic.createTutorial(userId, title, text)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 400
                if (error instanceof SystemError)
                    status = 500
                else if (error instanceof NotFoundError)
                    status = 404
                res.status(status).json({ error: error.constructor.name, message: error.message })
            })

    } catch (error) {

        let status = 404
        if (error instanceof ContentError)
            status = 406
        else if (error instanceof JsonWebTokenError) {
            status = 401
            error = new TokenError(error.message)
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })


    }
}