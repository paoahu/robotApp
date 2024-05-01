import { validate, errors } from 'com'
import { User, Movement, SequenceMovement } from '../data/models.js'
const { SystemError, NotFoundError } = errors

function retrieveMovements(userId, sequenceId) {
    validate.id(userId, 'user id')
    validate.id(sequenceId, 'sequence id')

    return (async () => {

        let user
        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')

        let sequence

        try {

            sequence = await SequenceMovement.findById(sequenceId).populate('movements')
            if (!sequence) {
                throw new NotFoundError(`Sequence with id ${sequenceId} not found`)
            }

            if (sequence.userId.toString() !== userId) {
                throw new NotFoundError(`User ${userId} is not authorized to access this sequence`)
            }

            return sequence.movements

        } catch (error) {
            throw new SystemError(error.message)
        }



    })()


}

export default retrieveMovements