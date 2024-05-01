import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1


async function walkForward(ottoInstance) {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }

    try {

        await ottoInstance.restartOscillators()
        await ottoInstance.home()

        await ottoInstance.walkForward(4, 1000)
        console.log('Otto walked ')
    } catch (error) {
        console.error('Otto failed to walk forward:', error)
        throw error
    }
}


export default walkForward