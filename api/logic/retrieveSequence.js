import { validate, errors } from 'com'
import { User, Movement, SequenceMovement } from '../data/models.js'
const { SystemError, NotFoundError } = errors

function retrieveSequence(userId) {
    validate.id(userId, 'user id')

    return (async () => {

        let user
        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')



        try {

            let userSequences = await SequenceMovement.find({ userId: userId })

            userSequences = userSequences.map(sequence => {
                const transformedSequence = {
                    id: sequence._id.toString(),
                    movements: sequence.movements.map(movement => ({
                        id: movement._id.toString(),
                        name: movement.name,
                        type: movement.type,
                        ordinal: movement.ordinal
                    })),
                    createdAt: sequence.createdAt
                }

                return transformedSequence
            })

            return userSequences
        } catch (error) {
            throw new SystemError(error.message)
        }


    })()



}

export default retrieveSequence