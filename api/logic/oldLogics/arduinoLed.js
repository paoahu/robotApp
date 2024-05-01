import pkg from 'johnny-five'
const { Board, Led } = pkg

const arduinoLed = () => {
    return new Promise((resolve, reject) => {
        const board = new Board()

        board.on("ready", () => {
            const led = new Led(13)
            led.blink(500)
            console.log('LED should be blinking now.')
            resolve()
        })

        board.on("error", error => {
            console.error('Board initialization failed:', error.message)
            reject(error); //rechaza la promesa
        })
    })
}

export default arduinoLed