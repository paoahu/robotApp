import dotenv from 'dotenv'
import mongoose from 'mongoose'
import editSequence from './editSequence.js'

dotenv.config();

(async () => {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Instrucciones:")
    console.log("Pulsa 'e' para borrar la secuencia.")
    console.log("Pulsa 'u' para subir la secuencia una posición.")
    console.log("Pulsa 'd' para bajar la secuencia una posición.")
    console.log("Pulsa 'Ctrl + C' para salir del programa.")

    const sequenceId = '65ec9788bcfbaf8e5d352a6c'
    const movementId = '65ec9ced16cd00646b53aa1d'

    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    process.stdin.on('data', async (key) => {
        try {
            switch (key.toLowerCase()) {
                case 'e':
                    console.log("Eliminando movimiento de la secuencia...")
                    await editSequence(sequenceId, movementId, 'delete')
                    console.log("Movimiento eliminado.")
                    break;
                case 'u':
                    console.log("Moviendo movimiento una posición hacia arriba...")
                    await editSequence(sequenceId, movementId, 'moveUp')
                    console.log("Movimiento movido hacia arriba.")
                    break;
                case 'd':
                    console.log("Moviendo movimiento una posición hacia abajo...")
                    await editSequence(sequenceId, movementId, 'moveDown')
                    console.log("Movimiento movido hacia abajo.")
                    break;
                case '\u0003':
                    console.log("Saliendo...")
                    process.exit()
                    break;
                default:
                    console.log("Entrada inválida.")
                    break;
            }
        } catch (error) {
            console.error(error)
        }
    })
})()