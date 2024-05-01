import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

import saveInSequence from './saveInSequence.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

function delay(ms) {
    return new Promise(resolve => {
        console.log(`Waiting ${ms} milliseconds...`)
        setTimeout(() => {
            console.log("Wait over, continuing with the next action.")
            resolve()
        }, ms)
    })
}



async function noGravity(ottoInstance, userId) {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }

    console.log(`Executing noGravity`)


    const positions = [
        { leftFoot: 120, rightFoot: 140 },
        { leftFoot: 140, rightFoot: 140 },
        { leftFoot: 120, rightFoot: 140 },
        { leftFoot: 90, rightFoot: 90 }
    ]

    const tempo = 2000


    for (const position of positions) {
        const servoLeftFoot = new Servo(4)
        const servoRightFoot = new Servo(5)
        servoLeftFoot.to(position.leftFoot)
        servoRightFoot.to(position.rightFoot)


        await delay(tempo)
    }

    console.log("noGravity completed")

    try {

        const savedSequence = await saveInSequence({
            type: 'noGravity',
            name: 'No Gravity',

        }, userId)
        console.log('No Gravity movement saved', savedSequence)
    } catch (error) {
        console.error('Error saving No Gravity movement', error)
        throw error
    }
}

export default noGravity