import pkg from 'johnny-five'
const { Board } = pkg
import { Otto } from '../otto.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

const ottoStop = () => {
    return new Promise((resolve, reject) => {
        const board = new Board()

        board.on("ready", () => {

            const myOtto = new Otto({
                leftLegPin: 2,
                rightLegPin: 3,
                leftFootPin: 4,
                rightFootPin: 5,
                board: board
            })

            myOtto.init()


            myOtto.stopServos()
        })

        board.on("error", error => {
            console.error('Board initialization failed:', error.message)
            reject(error)
        })
    })
}

export default ottoStop