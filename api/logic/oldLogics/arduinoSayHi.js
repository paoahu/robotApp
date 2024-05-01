import pkg from 'johnny-five'
const { Board, Proximity } = pkg
import { Otto } from '../otto.js'

const board = new Board();

let sayHi = false



console.log('while')
board.on("ready", () => {
    const proximity = new Proximity({
        controller: "HCSR04",
        pin: 9
    })

    while (sayHi === false) {
        proximity.on("change", () => {
            const { centimeters, inches } = proximity
            console.log("Proximity: ")
            console.log("  cm  : ", centimeters)
            console.log("  in  : ", inches)
            console.log("-----------------")
        })
    }
})





export default arduinoSayHi