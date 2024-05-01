import logic from '../logic/index.js'

import { errors } from 'com'
const { ContentError } = errors

export default (req, res) => {

    try {
        console.log(req.body)
        const { movementId, action } = req.body
        const { sequenceId } = req.params

        switch (action) {
            case 'delete':
                logic.editSequence(sequenceId, movementId, 'delete').then(() => {
                    res.status(200).json({ message: 'movement deleted' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                });
                break;
            case 'moveUp':
                logic.editSequence(sequenceId, movementId, 'moveUp').then(() => {
                    res.status(200).json({ message: 'movement has move up' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                });
                break;

            case 'moveDown':
                logic.editSequence(sequenceId, movementId, 'moveDown').then(() => {
                    res.status(200).json({ message: 'movement has move down' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                });
                break;

            default:
                res.status(400).json({ message: 'Invalid action' })
                break;
        }

    } catch (error) {


        let status = 500
        if (error instanceof ContentError || error instanceof TypeError) {
            status = 406;
        }
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}