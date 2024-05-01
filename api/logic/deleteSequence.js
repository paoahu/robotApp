import { validate, errors } from 'com'

import { SequenceMovement, User } from '../data/models.js'

const { NotFoundError, CredentialsError, SystemError } = errors

function deleteSequence(userId, sequenceId) {

    validate.id(userId, 'user id')
    validate.id(sequenceId, 'sequenceId')

    return (async () => {

        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')

        let sequence

        try {
            sequence = await SequenceMovement.findById(sequenceId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!sequence)
            throw new NotFoundError('Sequence not found')



        if (userId.toString() !== sequence.userId.toString())
            throw new CredentialsError('User is not sequence owner')

        let deletedSequence

        try {
            deletedSequence = await SequenceMovement.findByIdAndDelete(sequenceId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!deletedSequence)
            throw new NotFoundError('Sequence can\'t be deleted')
    })()
}

export default deleteSequence