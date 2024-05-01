import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

import saveInSequence from './saveInSequence.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

async function stop(ottoInstance, userId) {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }


    ottoInstance.stopServos()
    console.log("Otto has stopped")

    try {

        const savedSequence = await saveInSequence({
            type: 'stop',
            name: 'Stop'
        }, userId)
        console.log('Stop movement saved', savedSequence)
        return savedSequence
    } catch (error) {
        console.error('Error trying to save stop movement', error)
        throw error
    }
}

export default stop
