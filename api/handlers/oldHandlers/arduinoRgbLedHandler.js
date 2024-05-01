// handlers/arduinoLedHandler.js
import { controlLed } from '../logic/arduinoRgbLedControl.js'


export const arduinoRgbLedHandler = (server, jsonBodyParser) => {
    // Inicializa la placa cuando este manejador se registre
    controlLed.initializeBoard();

    server.post('/arduino/led', jsonBodyParser, (req, res) => {
        const { action, color } = req.body;
        try {
            switch (action) {
                case 'setColor':
                    controlLed.setColor(color);
                    break;
                case 'toggleBlink':
                    controlLed.toggleBlink();
                    break;
                // Aquí podrías agregar más casos para otras acciones
                default:
                    return res.status(400).json({ message: 'Acción no válida' });
            }
            return res.status(200).json({ message: 'Acción realizada con éxito' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al realizar la acción', details: error.message });
        }
    });
};