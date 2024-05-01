import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

async function walkBackward(ottoInstance) {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }

    try {

        await ottoInstance.restartOscillators()
        await ottoInstance.walkBackward(4, 2000)
        console.log('Otto walked backward!')
    } catch (error) {
        console.error('Otto failed to walk backward:', error)
        throw error
    }
}



export default walkBackward



