import { validate, errors } from 'com'
import { User, Movement, SequenceMovement } from '../data/models.js'
const { SystemError, NotFoundError, ValidationError } = errors

function editSequence(sequenceId, movementId, action) {
    validate.id(sequenceId, 'sequence id')
    validate.id(movementId, 'movement id')


    return (async () => {


        let sequence

        try {
            sequence = await SequenceMovement.findById(sequenceId).populate('movements')
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!sequence) {
            throw new NotFoundError('Sequence not found')
        }



        const movements = sequence.movements


        const movementIndex = movements.findIndex(movement => movement.id === movementId)


        if (movementIndex === -1) {
            throw new NotFoundError('Movement not found in sequence')
        }



        switch (action) {
            case 'delete':
                movements.splice(movementIndex, 1)
                break;
            case 'moveUp':
                if (movementIndex === 0) {

                    throw new ValidationError('Movement is already at the top')
                }

                [movements[movementIndex], movements[movementIndex - 1]] = [movements[movementIndex - 1], movements[movementIndex]]
                break;
            case 'moveDown':
                if (movementIndex === movements.length - 1) {
                    throw new ValidationError('Movement is already at the bottom')
                }

                [movements[movementIndex], movements[movementIndex + 1]] = [movements[movementIndex + 1], movements[movementIndex]]
                break;
            default:
                throw new ValidationError('Invalid action')
        }


        await sequence.save()

        return sequence
    })()
}

export default editSequence