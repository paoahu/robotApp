import logic from '../../logic/index.js'

import { errors } from 'com'
const { BluetoothError } = errors

export default (req, res) => {
    try {
        logic.arduinoConnect()
            .then(message => res.status(200).json({ message }))
            .catch(error => {
                let status = 500

                if (error instanceof BluetoothError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        let status = 500
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}