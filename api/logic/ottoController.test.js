
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import OttoController from './ottoController.js'

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1



dotenv.config();

(async () => {

    await mongoose.connect(process.env.MONGODB_URL)


    const ottoController = new OttoController()


    ottoController.board.on("ready", async () => {
        console.log("Control de Otto activado. Presiona 'W' para caminar, 'S' para detener, 'B' para caminar hacia atrás, 'H' para shake leg, 'R' para girar a la derecha, 'L' para girar a la derecha, 'J' para saltar, 'M' para snakeMove,  'A' para reproducir secuencia, 'H' para decir hola en el LCD, 'C' para limpiar pantalla.");

        process.stdin.setRawMode(true)
        process.stdin.resume()
        process.stdin.setEncoding('utf8')



        process.stdin.on('data', async (key) => {
            switch (key.toLowerCase()) {
                case 'w':
                    console.log("Caminando hacia adelante...")
                    try {
                        await ottoController.walkForward()
                    } catch (error) {
                        console.error(error)
                    }
                    break;

                case 'f':
                    console.log("First Part..")
                    try {
                        await ottoController.firstPart()
                    } catch (error) {
                        console.error(error)
                    }
                    break;

                case 'd':
                    console.log("Final Dance..")
                    try {
                        await ottoController.danceSing()
                    } catch (error) {
                        console.error(error)
                    }
                    break;


                case 'o':
                    console.log("Haciendo Moonwalker..")
                    try {
                        await ottoController.moonwalker('65d8d9dffdfc051c2e6c1e96', 8, 1000, 30, 1)
                    } catch (error) {
                        console.error(error)
                    }
                    break;

                case 'u':
                    console.log("Haciendo crusaito..")
                    try {
                        await ottoController.crusaito('65d8d9dffdfc051c2e6c1e96', 10, 2000, 70, 1)
                    } catch (error) {
                        console.error(error)
                    }
                    break;

                case 'a':
                    console.log("Ejecutando secuencia..")
                    try {
                        await ottoController.executeSequenceById('65fe87e995bd04c9a34de82c')
                    } catch (error) {
                        console.error(error)
                    }
                    break;
                case 's':
                    console.log("Deteniendo...")
                    try {
                        await ottoController.stop('65d8d9dffdfc051c2e6c1e96')
                    } catch (error) {
                        console.error(error)
                    }
                    break;
                case 'e':
                    console.log("Guardando secuencia")
                    try {
                        await ottoController.endSequence('65d8d9dffdfc051c2e6c1e96')
                    } catch (error) {
                        console.error(error)
                    }
                    break;
                case 'b':
                    console.log("Caminando hacia atrás...")
                    try {
                        await ottoController.walkBackward()
                    } catch (error) {
                        console.error(error)
                    }
                    break;



                case 'x':
                    console.log("Swing")
                    try {
                        await ottoController.swing('65d8d9dffdfc051c2e6c1e96', 4, 1000, 40)
                    } catch (error) {
                        console.error('Error al intentar girar a la derecha y caminar:', error)
                    }
                    break;


                case 'r':
                    console.log("Girando a la derecha")
                    try {
                        await ottoController.turn(7, 2000, RIGHT)
                    } catch (error) {
                        console.error('Error al intentar girar a la derecha y caminar:', error)
                    }
                    break;
                case 'l':
                    console.log("Girando a la izquierda")
                    try {
                        await ottoController.turn(7, 2000, LEFT)
                    } catch (error) {
                        console.error('Error al intentar girar a la izquierda y caminar:', error)
                    }
                    break;

                case 'j':
                    console.log("Saltando")
                    try {
                        await ottoController.jump('65d8d9dffdfc051c2e6c1e96')
                    } catch (error) {
                        console.error('Error al intentar saltar:', error)
                    }
                    break;
                case 'g':
                    console.log("Gravity")
                    try {
                        await ottoController.noGravity('65d8d9dffdfc051c2e6c1e96')
                    } catch (error) {
                        console.error('Error al intentar saltar:', error)
                    }
                    break;

                case 'k':
                    console.log("Kickleft")
                    try {
                        await ottoController.kickLeft('65d8d9dffdfc051c2e6c1e96', 1000)
                    } catch (error) {
                        console.error('Error al intentar kickLeft:', error)
                    }
                    break;

                case 'm':
                    console.log("Movimiento Snake")
                    try {
                        await ottoController.snakeMove('65d8d9dffdfc051c2e6c1e96')
                    } catch (error) {
                        console.error('Error al intentar saltar:', error)
                    }
                    break;
                case 'z':
                    console.log("Diciendo hola...")
                    try {
                        await ottoController.sayHi("¡Hola, soy Otto!")
                    } catch (error) {
                        console.error('Error al intentar mostrar mensaje en el LCD:', error)
                    }
                    break;

                case 'p':
                    console.log("upDown")
                    try {
                        await ottoController.upDown('65d8d9dffdfc051c2e6c1e96', 4, 1000)
                    } catch (error) {
                        console.error('Error al intentar upDown:', error)
                    }
                    break;

                case 'c':
                    console.log("Limpiando pantalla")
                    try {
                        await ottoController.clearLCD()
                    } catch (error) {
                        console.error('Error al intentar borrar el contenido LCD:', error)
                    }
                    break;
                case '\u0003':
                    console.log("Saliendo...")
                    process.exit()
                    break;
                default:
                    console.log("Entrada inválida.")
                    break;
            }
        })
    })
})()