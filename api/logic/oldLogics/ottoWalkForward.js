import pkg from 'johnny-five'
const { Board } = pkg
import { Otto } from '../otto.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

const ottoWalkForward = () => {
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


            myOtto.walk(4, 2000, FORWARD).then(() => {
                console.log('Otto walked!')
                resolve()
            }).catch(error => {
                console.error('Otto failed to walk:', error)
                reject(error)
            })
        })

        board.on("error", error => {
            console.error('Board initialization failed:', error.message)
            reject(error)
        })
    })
}

export default ottoWalkForward