import pkg from 'johnny-five'
const { Board, Led } = pkg

function arduinoLedBuiltIn() {

    const board = new Board()

    board.on("ready", function () {
        const led = new Led(13)
        led.strobe(1000)
    })

}

export default arduinoLedBuiltIn