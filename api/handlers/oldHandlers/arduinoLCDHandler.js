import logic from '../../logic/index.js'

import { errors } from 'com'
const { ContentError } = errors

export default (req, res) => {

    const { message } = req.body

    if (!message) {
        return res.status(400).json({ error: 'BadRequest', message: 'No message provided' })
    }

    try {
        logic.arduinoLCD(message)
            .then(() => res.status(200).send({ message: 'Message sent successfully' }))
            .catch(error => {
                let status = 500;
                res.status(status).json({ error: error.constructor.name, message: error.message })
            });
    } catch (error) {
        let status = 500;
        if (error instanceof ContentError || error instanceof TypeError)
            status = 406;
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}