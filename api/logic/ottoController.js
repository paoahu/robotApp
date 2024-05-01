import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin, Piezo } = pkg
import { Otto } from './otto.js'
import { Movement, SequenceMovement } from '../data/models.js'

import movement from './ottoMovements/index.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1



function delay(ms) {
    return new Promise(resolve => {
        console.log(`Waiting ${ms} milliseconds...`)
        setTimeout(() => {
            console.log('Wait over, continuing with the next action.')
            resolve()
        }, ms)
    })
}

class OttoController {
    constructor() {
        this.board = new Board()

        this.lcd = null

        this.lcdState = 'clear'


        this.otto = null

        this.board.on("ready", () => {
            this.lcd = new LCD({
                controller: "PCF8574"
            })
            this.otto = new Otto({
                leftLegPin: 2,
                rightLegPin: 3,
                leftFootPin: 4,
                rightFootPin: 5,

                board: this.board
            })

            this.otto.init()
            this.sayHi('Otto está listo!')
        })
    }


    ////////////// SEQUENCE LOGICS ////////////

    async executeMovement(movement) {

        const { type, userId, steps, T, h, dir, tempo } = movement

        if (!this.otto) {
            console.error('Otto is not initialized')
            return
        }

        try {

            switch (type) {
                case 'crusaito':
                    await this.crusaito(userId, steps, T, h, dir)
                    break;
                case 'upDown':
                    await this.upDown(userId, steps, T)
                    break;
                case 'kickLeft':
                    await this.kickLeft(userId, tempo)
                    break;
                case 'noGravity':
                    await this.noGravity(userId)
                    break;
                case 'moonwalker':
                    await this.moonwalker(userId, steps, T, h, dir)
                    break;
                case 'swing':
                    await this.swing(userId, steps, T, h)
                    break;
                case 'shakeLegLeft':
                    await this.shakeLegLeft(userId, steps, T)
                    break;

                case 'shakeLegRight':
                    await this.shakeLegRight(userId, steps, T)
                    break;
                case 'jump':
                    await this.jump(userId)
                    break;
                case 'snakeMove':
                    await this.snakeMove(userId)
                    break;
                case 'stop':
                    await this.stop(userId)
                    break;

                default:
                    console.log(`Movement type '${type}' not recognized.`)
            }
        } catch (error) {
            console.error(`Error executing movement '${type}': ${error}`)
        }
    }

    async executeSequenceById(sequenceId) {
        try {

            const sequence = await SequenceMovement.findById(sequenceId)
            if (!sequence) {
                console.log('Sequence not found')
                return
            }


            for (const movement of sequence.movements) {
                console.log(`Executing ${movement.name}`)

                await this.executeMovement(movement)

                await delay(2000)
            }

            console.log('All movements of the sequence have been executed')
        } catch (error) {
            console.error('Error executing the sequence', error)
        }
    }



    endSequence(userId) {
        return new Promise((resolve, reject) => {

            if (!userId) {
                console.error('Error: userId is required to end a sequence.')
                reject(new Error('userId is required to end a sequence.'))
                return;
            }


            const newSequence = new SequenceMovement({
                userId,
                movements: [],
                createdAt: new Date()
            })

            newSequence.save()
                .then(() => {
                    console.log('New sequence created for userId:', userId)
                    resolve(newSequence)
                })
                .catch(error => {
                    console.error('Error al crear una nueva secuencia:', error)
                    reject(error)
                })
        })
    }
    ////// PANTALLA //////


    sayHi(message) {
        return new Promise((resolve, reject) => {

            if (!this.lcd) {
                console.error('LCD no está inicializado.')
                reject(new Error('LCD no está inicializado.'))
                return
            }

            this.lcd.clear()


            import('lcd-scrolling').then(scrollModule => {
                const scroll = scrollModule.default


                scroll.setup({
                    lcd: this.lcd,
                    debug: false,
                    char_length: 16,
                    row: 2,
                    firstCharPauseDuration: 4000,
                    lastCharPauseDuration: 1000,
                    scrollingDuration: 300,
                    full: true
                })


                scroll.line(0, message)


                console.log('Message displayed with scrolling')
                resolve()


                setTimeout(() => {
                    this.lcd.clear()
                    console.log('LCD cleared after displaying the message.')
                    resolve()
                }, 5000)


            }).catch(error => {
                console.error("Error al importar o usar lcd-scrolling:", error)
                reject(error)
            })
        })
    }



    clearLCD() {
        return new Promise((resolve, reject) => {
            if (!this.lcd) {
                console.error('LCD no está inicializado.')
                reject(new Error('LCD no está inicializado.'))
                return
            }

            try {
                this.lcd.clear()

                console.log('LCD cleared and "Esperando.." displayed')
                resolve()
            } catch (error) {
                console.error('Error clearing LCD or displaying message:', error)
                reject(error)
            }
        })
    }


    //// SEQUENCE MOVEMENTS //// 

    async crusaito(userId, steps, T, h, dir) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.crusaito(this.otto, userId, steps, T, h, dir)
    }

    async upDown(userId, steps, T) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.upDown(this.otto, userId, steps, T)
    }

    async kickLeft(userId, tempo) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.kickLeft(this.otto, userId, tempo)
    }

    async noGravity(userId) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.noGravity(this.otto, userId)
    }


    async moonwalker(userId, steps, T, h, dir) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.moonwalker(this.otto, userId, steps, T, h, dir)
    }


    async swing(userId, steps, T, h) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.swing(this.otto, userId, steps, T, h)
    }


    async shakeLegRight(userId, steps, T) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.shakeLegRight(this.otto, userId, steps, T)
    }

    async shakeLegLeft(userId, steps, T) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.shakeLegLeft(this.otto, userId, steps, T)
    }

    async jump(userId) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.jump(this.otto, userId)
    }

    async snakeMove(userId) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.snakeMove(this.otto, userId)
    }

    async stop(userId) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.stop(this.otto, userId)
    }



    /// NO SEQUENCE MOVEMENTS // 

    async turn(steps, period, direction) {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.turn(this.otto, steps, period, direction)
    }

    async walkForward() {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.walkForward(this.otto)
    }


    async firstPart() {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.firstPart(this.otto)
    }

    async danceSing() {

        if (!this.otto) {
            console.error("Otto is not initialized")
            return
        }


        const piezo = new Piezo(6)
        const song = [

            ["F#4", 1 / 4], ["E4", 1 / 4], ["F#4", 1 / 4], ["E4", 1 / 4], ["F#4", 1 / 2], ["A4", 1 / 2],
            ["F#4", 1 / 4], ["A4", 1 / 4], ["F#4", 1 / 2], ["F#4", 1 / 2], ["B4", 1 / 2], ["F#4", 1 / 2],
            ["C#4", 1 / 2], ["F#4", 1 / 4], ["E4", 1 / 4], ["F#4", 1 / 2], ["F#4", 1 / 2],
            ["F#4", 1 / 4], ["E4", 1 / 4], ["F#4", 1 / 2], ["G#4", 1 / 2], ["F#4", 1 / 2],

            ["E4", 1 / 2], ["F#4", 1 / 4], ["E4", 1 / 4], ["F#4", 1 / 4], ["E4", 1 / 4], ["F#4", 1 / 2], ["A4", 1 / 2],
            ["F#4", 1 / 4], ["A4", 1 / 4], ["F#4", 1 / 2], ["F#4", 1 / 2], ["E4", 1 / 2], ["F#4", 1 / 2],
            ["C#4", 1 / 2], ["F#4", 1 / 2], ["D4", 1 / 4], ["D4", 1 / 4], ["D4", 1 / 4], ["D4", 1 / 4], ["E4", 1 / 2], ["F#4", 1 / 2],
            ["F#4", 1 / 2], ["F4", 1 / 4], ["F4", 1 / 4], ["F#4", 1 / 2], ["G#4", 1 / 2],

            ["F#4", 1 / 2], ["E4", 1 / 4], ["C#4", 1 / 4], ["F#4", 1 / 2],
            ["F#4", 1 / 2], ["E4", 1 / 4], ["C#4", 1 / 4], ["F#4", 1 / 2],
            ["F#4", 1 / 2], ["E4", 1 / 4], ["C#4", 1 / 4], ["F#4", 1 / 2],
            ["F#4", 1 / 4], ["A4", 1 / 4], ["B4", 1 / 2], ["A4", 1 / 4], ["G#4", 1 / 4], ["F#4", 1 / 2],

            ["F#4", 1 / 4], ["C#5", 1 / 4], ["B4", 1 / 2], ["F#4", 1 / 2], ["D4", 1 / 2], ["C#4", 1 / 2],

            ["F#4", 1 / 4], ["A4", 1 / 4], ["B4", 1 / 2], ["A4", 1 / 4], ["G#4", 1 / 4], ["F#4", 1 / 2],
            ["F#4", 1 / 4], ["C#5", 1 / 4], ["B4", 1 / 2], ["F#4", 1 / 2], ["D4", 1 / 2], ["C#4", 1 / 2],

            ["F#", 1 / 2], ["G#", 1 / 2], ["F#", 1 / 2],

            ["F#4", 1 / 4], ["C#5", 1 / 4], ["B4", 1 / 2], ["F#4", 1 / 2], ["D4", 1 / 2], ["C#4", 1 / 2],

            ["F#4", 1 / 4], ["A4", 1 / 4], ["B4", 1 / 2], ["A4", 1 / 4], ["G#4", 1 / 4], ["F#4", 1 / 2],
            ["F#4", 1 / 4], ["C#5", 1 / 4], ["B4", 1 / 2], ["F#4", 1 / 2], ["D4", 1 / 2], ["C#4", 1 / 2],

            ["F#", 1 / 2], ["G#", 1 / 2], ["F#", 1 / 2]


        ]
        const tempo = 60


        try {
            await Promise.all([
                this.firstPart(),
                new Promise((resolve) => piezo.play({ song, tempo }, resolve))
            ])
            console.log("Dance and song finished.")
        } catch (error) {
            console.error("An error occurred during the dance and sing routine:", error)
        }
    }



    async walkBackward() {
        if (!this.otto) {
            throw new Error('Otto is not initialized')
        }
        await movement.walkBackward(this.otto)
    }


}

export default OttoController

