import { ArduinoOLED } from './arduinoSetup.js'

const myOLED = new ArduinoOLED()

const arduinoOled = async () => {
    try {
        // Espera a que el board esté listo antes de mostrar el mensaje.
        await myOLED.boardReady()
        myOLED.displayMessage()
        console.log('LED should be displaying "Cats and dogs are really cool animals, you know." now.')
    } catch (error) {
        console.error('Board initialization failed:', error)
    }
}

export default arduinoOled
