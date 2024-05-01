import pkg from 'johnny-five'
const { Board, Led } = pkg

// Este es el manejador para la ruta específica
export const arduinoLedHandler = (req, res) => {
    const board = new Board()

    board.on("ready", function () {
        const led = new Led(13)
        led.strobe(1000); // Parpadea cada segundo

        // Responde al cliente una vez que el Arduino esté listo y el LED comience a parpadear
        res.status(200).json({ message: 'LED is blinking!' })
    })

    board.on("error", function (error) {
        // Maneja cualquier error que pueda ocurrir
        res.status(500).json({ error: 'Failed to initialize the board', details: error.message })
    })
}

export default arduinoLedHandler