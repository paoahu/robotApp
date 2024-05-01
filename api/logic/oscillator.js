import pkg from 'johnny-five'
const { Servo } = pkg

export class Oscillator {
    constructor({ pin, board }) {
        this.servo = new Servo({ pin, board })
        this.amplitude = 0
        this.offset = 0
        this.period = 1000
        this.phase = 0
        this.currentAngle = 0
        this.lastUpdateTime = 0
        this.isRunning = false

    }

    attach() {
        this.servo.to(this.offset)
    }

    setParameters({ amplitude, period, phase, offset }) {
        this.amplitude = amplitude
        this.period = period
        this.phase = phase
        this.offset = offset
    }

    reset() {
        this.isRunning = false

    }

    start() {
        this.reset()
        this.isRunning = true
        this.lastUpdateTime = Date.now()
        this.update()
    }

    update() {

        if (!this.isRunning) return

        const now = Date.now()
        const elapsedTime = now - this.lastUpdateTime

        if (elapsedTime >= this.period) {
            this.lastUpdateTime = now - (elapsedTime % this.period)
        }

        const phaseProgress = ((now - this.lastUpdateTime) / this.period) * 2 * Math.PI
        const angle = this.amplitude * Math.sin(phaseProgress + this.phase) + this.offset



        this.servo.to(angle)


        setTimeout(() => this.update(), 50)
    }

    stop() {
        if (this.servo) {
            this.servo.to(this.offset)
            this.servo.stop()
        }
        this.isRunning = false
    }

    restart() {
        this.stop()
        this.reset()
        this.start()
    }

}