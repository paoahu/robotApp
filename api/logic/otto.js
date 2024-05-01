import pkg from 'johnny-five'
const { Board, Servo, LCD } = pkg

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

import { Oscillator } from './oscillator.js'

export class Otto {
    constructor({ leftLegPin, rightLegPin, leftFootPin, rightFootPin, board, lcd }) {
        this.board = board;
        this.oscillators = [
            new Oscillator({ pin: leftLegPin, board: this.board }),
            new Oscillator({ pin: rightLegPin, board: this.board }),
            new Oscillator({ pin: leftFootPin, board: this.board }),
            new Oscillator({ pin: rightFootPin, board: this.board })
        ]
        this.isOttoResting = false
    }

    init() {
        this.oscillators.forEach(oscillator => oscillator.attach())
        this.home()
    }

    home() {
        this.oscillators.forEach(oscillator => {
            oscillator.setParameters({ amplitude: 30, period: 1000, phase: 0, offset: 90 })
            oscillator.start()
        })
        this.isOttoResting = true
    }

    walk(steps, period, direction) {
        return new Promise((resolve, reject) => {

            console.log(`Walking ${steps} steps in direction ${direction} with period ${period}`)


            setTimeout(() => {
                this.stopServos()
                resolve()
            }, period * steps)
        })
    }


    walkBackward(steps, period) {
        return new Promise((resolve, reject) => {
            console.log(`Intentando caminar ${steps} pasos hacia atrás con un periodo de ${period}`)


            this.oscillators.forEach((oscillator, index) => {

                const isLeg = index < 2
                const adjustment = isLeg ? 0 : 5
                const phaseAdjustment = Math.PI + (isLeg ? 0 : Math.PI / 4)

                oscillator.setParameters({
                    amplitude: 20 + adjustment,
                    period: 1000,
                    phase: phaseAdjustment,
                    offset: 90
                })
                oscillator.start()
            })

            setTimeout(() => {
                this.stopServos()
                resolve()
            }, period * steps)
        })
    }

    walkForward(steps, period) {
        return new Promise((resolve, reject) => {
            console.log(`Intentando caminar ${steps} pasos hacia adelante con un periodo de ${period}`)

            this.oscillators.forEach((oscillator, index) => {
                const isLeg = index < 2
                const adjustment = isLeg ? 0 : 5
                const phaseAdjustment = isLeg ? 0 : -Math.PI / 4

                oscillator.setParameters({
                    amplitude: 20 + adjustment,
                    period: period,
                    phase: phaseAdjustment,
                    offset: 90
                })
                oscillator.start()
            })

            setTimeout(() => {
                this.stopServos()
                resolve()
            }, period * steps)
        })
    }

    stopServos() {
        this.oscillators.forEach(oscillator => {
            oscillator.stop()
        })
        this.isOttoResting = true
    }

    restartOscillators() {
        this.oscillators.forEach(oscillator => oscillator.restart())
    }


}
