import pkg from 'johnny-five'
const { Board, Led } = pkg


let anode

const initializeBoard = () => {
    const board = new Board({ repl: false })

    board.on('ready', function () {
        anode = new Led.RGB({
            pins: {
                red: 9,
                green: 11,
                blue: 10
            },
            isAnode: true
        })

        anode.on()
        anode.color("#efe13d")
        anode.blink(1000)
    })

    board.on('error', function (error) {
        console.error('Board initialization failed:', error.message)
    })
}

const setColor = (color) => {
    if (anode) {
        anode.color(color)
    }
}

const toggleBlink = (blink) => {
    if (anode) {
        if (blink) {
            anode.blink(1000)
        } else {
            anode.stop().off()
        }
    }
}

// Exportando las funciones utilizando ES Modules
export const controlLed = { initializeBoard, setColor, toggleBlink }