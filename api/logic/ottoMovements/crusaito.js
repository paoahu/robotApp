import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin } = pkg

import { SequenceMovement } from '../../data/models.js'

import saveInSequence from './saveInSequence.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

const crusaito = async (ottoInstance, userId, steps, T, h, dir) => {
    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }
    console.log(`Crusaito for ${steps} steps with period ${T}, height ${h}, and direction ${dir}`)

    const servoLeftFoot = new Servo(4)
    const servoRightFoot = new Servo(5)

    let currentStep = 0
    const angleIncrement = h / 2
    const baseAngle = 90

    const moveFeet = () => {
        const angleOffset = (currentStep % 2 === 0) ? angleIncrement : -angleIncrement
        const leftFootAngle = dir === LEFT ? baseAngle - angleOffset : baseAngle + angleOffset
        const rightFootAngle = dir === LEFT ? baseAngle + angleOffset : baseAngle - angleOffset

        servoLeftFoot.to(leftFootAngle)
        servoRightFoot.to(rightFootAngle)

        currentStep++
    }

    for (let i = 0; i < steps; i++) {
        setTimeout(moveFeet, (T / steps) * i)
    }


    await new Promise(resolve => setTimeout(resolve, 2000))
    // envolvemos setTimeout en una promesa, porque no devuelve ninguna y por eso no podemos usa async/await

    servoLeftFoot.to(90)
    servoRightFoot.to(90)

    console.log("Crusaito completed")


    try {
        const savedSequence = await saveInSequence({
            type: 'crusaito',
            name: 'Crusaito',
            steps,
            T,
            h,
            dir
        }, userId)
        console.log('Crusaito movement saved', savedSequence)
    } catch (error) {
        console.error('Error saving Crusaito', error)
        throw error
    }
}

export default crusaito

