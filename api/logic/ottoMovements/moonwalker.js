import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

import saveInSequence from './saveInSequence.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

async function moonwalker(ottoInstance, userId, steps, T, h, dir) {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }

    console.log(`Moonwalking for ${steps} steps with period ${T}, height ${h}, and direction ${dir}`)

    const servoLeftFoot = new Servo(4)
    const servoRightFoot = new Servo(5)

    const angleStartLeft = dir === LEFT ? 90 - h : 90 + h
    const angleStartRight = dir === LEFT ? 90 + h : 90 - h
    const angleEndLeft = dir === LEFT ? 90 + h / 2 : 90 - h / 2
    const angleEndRight = dir === LEFT ? 90 - h / 2 : 90 + h / 2

    for (let currentStep = 0; currentStep < steps; currentStep++) {
        if (currentStep % 2 === 0) {
            servoLeftFoot.to(angleStartLeft)
            servoRightFoot.to(angleStartRight)
        } else {
            servoLeftFoot.to(angleEndLeft)
            servoRightFoot.to(angleEndRight)
        }
        await new Promise(resolve => setTimeout(resolve, T / steps))
    }


    servoLeftFoot.to(90)
    servoRightFoot.to(90)

    console.log("Moonwalk completed")

    try {

        const savedSequence = await saveInSequence({
            type: 'moonwalker',
            name: 'Moonwalker',
            steps,
            T,
            h,
            dir
        }, userId);
        console.log('Moonwalker movement saved', savedSequence)
    } catch (error) {
        console.error('Error saving Moonwalker movement', error)
        throw error
    }
}

export default moonwalker

