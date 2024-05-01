import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

import saveInSequence from './saveInSequence.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

async function snakeMove(ottoInstance, userId) {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }

    console.log("Turning right")


    ottoInstance.oscillators.forEach((oscillator, index) => {
        const isRightLeg = index % 2 !== 0
        oscillator.setParameters({
            amplitude: isRightLeg ? 20 : 40,
            period: 600,
            phase: isRightLeg ? Math.PI / 2 : 0,
            offset: 90
        })
        oscillator.start()
    })


    await new Promise(resolve => setTimeout(resolve, 2000))

    ottoInstance.oscillators.forEach(oscillator => oscillator.stop())
    console.log('Otto has completed the snake move')

    try {
        const savedSequence = await saveInSequence({
            type: 'snakeMove',
            name: 'Snake Move'
        }, userId);
        console.log('Snake Move movement saved', savedSequence)
        return savedSequence
    } catch (error) {
        console.error('Error trying to save snakeMove', error)
        throw error
    }
}



export default snakeMove
