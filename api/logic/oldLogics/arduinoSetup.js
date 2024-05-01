const five = require('johnny-five')
const Oled = require('oled-js')
const font = require('oled-font-5x7')

class ArduinoOLED {
    constructor() {
        this.board = new five.Board()
        this.boardReadyPromise = new Promise((resolve, reject) => {
            this.board.on('ready', () => {
                this.setup()
                resolve()
            })
            this.board.on('error', error => reject(error))
        })
    }

    setup() {
        const opts = {
            width: 128,
            height: 64,
            address: 0x3C
        };
        this.oled = new Oled(this.board, five, opts)
    }

    displayMessage() {
        this.oled.clearDisplay()
        this.oled.setCursor(1, 1)
        this.oled.writeString(font, 1, 'Cats and dogs are really cool animals, you know.', 1, true, 2, true)
        this.oled.update()
        console.log('LED should be displaying "Hola" now.')
    }

    boardReady() {
        return this.boardReadyPromise
    }
}

module.exports = { ArduinoOLED }
