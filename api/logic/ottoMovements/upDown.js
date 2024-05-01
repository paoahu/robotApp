import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

import saveInSequence from './saveInSequence.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

const upDown = async (ottoInstance, userId, steps, T) => {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }

    console.log(`UpDown movement for ${steps} steps with period ${T}`)

    const servoLeftFoot = new Servo(4)
    const servoRightFoot = new Servo(5)

    let currentStep = 0
    const intervalId = setInterval(() => {
        if (currentStep % 2 === 0) {
            servoLeftFoot.to(0)
            servoRightFoot.to(180)
        } else {
            servoLeftFoot.to(180)
            servoRightFoot.to(0)
        }
        currentStep++

        if (currentStep >= steps) {
            clearInterval(intervalId)

            servoLeftFoot.to(90)
            servoRightFoot.to(90)

            console.log("UpDown movement completed")
        }
    }, T / steps)


    await new Promise(resolve => setTimeout(resolve, T))


    try {
        const savedSequence = await saveInSequence({
            type: 'upDown',
            name: 'UpDown',
            steps,
            T
        }, userId)
        console.log('UpDown movement saved', savedSequence)
    } catch (error) {
        console.error('Error saving UpDown movement', error)
        throw error
    }
}

export default upDown