import logic from '../../logic/index.js'

import { errors } from 'com'
const { ContentError } = errors

export default (req, res) => {

    try {
        logic.ottoServosStop()
            .then(() => res.status(200).send())
            .catch(error => {

                let status = 500

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        let status = 500
        if (error instanceof ContentError || error instanceof TypeError)
            status = 406
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}
