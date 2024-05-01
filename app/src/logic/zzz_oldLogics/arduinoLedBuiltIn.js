import { errors } from 'com'

const { SystemError } = errors

function arduinoLedBuiltIn() {
    // Configurar la solicitud al servidor
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // No es necesario enviar un cuerpo de solicitud si la activación del LED no requiere parámetros
    };

    return fetch(`${import.meta.env.VITE_API_URL}/arduino/controller/led`, req)
        .catch(error => {
            // Manejo de errores en caso de que el servidor no responda
            throw new SystemError(error.message)
        })
        .then(res => {
            if (!res.ok) {
                // Manejo de errores basado en la respuesta del servidor
                return res.json()
                    .catch(error => {
                        throw new SystemError(error.message)
                    })
                    .then(body => {
                        // Lanzar un error específico basado en la respuesta del servidor
                        throw new errors[body.error](body.message)
                    })
            }
            // Opcionalmente, puedes devolver una promesa resuelta con un mensaje o resultado específico
            return res.json() // Esto asume que el servidor envía una respuesta JSON
        })
}

export default arduinoLedBuiltIn