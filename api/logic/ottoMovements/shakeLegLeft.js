import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

import saveInSequence from './saveInSequence.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

async function shakeLegLeft(ottoInstance, userId, steps, T) {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }

    console.log(`Shaking left leg for ${steps} steps with period ${T}`)


    const legPin = 2
    const footPin = 4

    const legServo = new Servo(legPin)
    const footServo = new Servo(footPin)


    for (let i = 0; i < steps; i++) {
        const phaseProgress = (i / steps) * 2 * Math.PI
        const angle = 30 * Math.sin(phaseProgress) + 90
        legServo.to(angle)
        footServo.to(angle)
        await new Promise(resolve => setTimeout(resolve, T / steps))
    }


    legServo.to(90)
    footServo.to(90)

    console.log("ShakeLegLeft completed")

    try {
        const savedSequence = await saveInSequence({
            type: 'shakeLegLeft',
            name: 'Shake Leg Left',
            steps,
            T,
        }, userId)
        console.log('Shake Leg Left movement saved', savedSequence)
    } catch (error) {
        console.error('Error saving Shake Leg Left movement', error)
        throw error
    }
}

export default shakeLegLeft