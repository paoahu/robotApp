import { SequenceMovement } from '../../data/models.js'

const saveInSequence = async (movementDetails, userId) => {
    try {

        const { type, name, steps, T, h, dir, tempo } = movementDetails

        const movement = { type, name, steps, T, h, dir, tempo, ordinal: 0 }

        const sequence = await SequenceMovement.findOne({ userId }).sort({ createdAt: -1 })

        const ordinal = sequence ? sequence.movements.length : 0
        movement.ordinal = ordinal

        if (!sequence) {
            const newSequence = new SequenceMovement({
                userId: userId,
                movements: [movement],
                createdAt: new Date(),
            })
            const savedSequence = await newSequence.save()
            console.log('New sequence saved', savedSequence)
            return savedSequence
        } else {
            sequence.movements.push(movement)
            const updatedSequence = await sequence.save()
            console.log('Movement added to last sequence', updatedSequence)
            return updatedSequence
        }
    } catch (error) {
        console.error('Error in saveInSequence', error)
        throw error
    }
}

export default saveInSequence
