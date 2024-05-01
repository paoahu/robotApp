import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

import saveInSequence from './saveInSequence.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

async function swing(ottoInstance, userId, steps, T, h) {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }

    console.log(`Swinging for ${steps} steps with period ${T} and height ${h}`)

    const servoLeftFoot = new Servo(4)
    const servoRightFoot = new Servo(5)

    const angleUp = 90 + h
    const angleDown = 90 - h

    for (let currentStep = 0; currentStep < steps; currentStep++) {
        if (currentStep % 2 === 0) {
            servoLeftFoot.to(angleUp)
            servoRightFoot.to(angleUp)
        } else {
            servoLeftFoot.to(angleDown)
            servoRightFoot.to(angleDown)
        }
        await new Promise(resolve => setTimeout(resolve, T / steps));
    }

    servoLeftFoot.to(90)
    servoRightFoot.to(90)

    console.log("Swing completed")

    try {

        const savedSequence = await saveInSequence({
            type: 'swing',
            name: 'Swing',
            steps,
            T,
            h,
        }, userId)
        console.log('Swing movement saved', savedSequence)
    } catch (error) {
        console.error('Error saving Swing movement', error)
        throw error
    }
}

export default swing
