import jwt from 'jsonwebtoken'


import logic from '../logic/index.js'
import { errors } from 'com'
const { NotFoundError, CredentialsError, ContentError } = errors

export default (req, res) => {
    try {
        const { email, password } = req.body
        logic.authenticateUser(email, password)
            .then(userId => {


                const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })


                res.json(token)
            })
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
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}