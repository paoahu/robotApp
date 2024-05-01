function arduinoConnectApp() {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // No necesitas un cuerpo para esta solicitud, a menos que tu lógica de conexión lo requiera
    };

    return fetch(`${import.meta.env.VITE_API_URL}/arduino/controller`, req)
        .then(res => res.json()) // Asume que tu servidor responde con JSON
        .then(body => {
            if (body.error) {
                throw new Error(body.message) // Lanza un error si tu API responde con un error
            }
            return body.message; // Retorna el mensaje de éxito de la conexión
        })
        .catch(error => {
            // Maneja errores de red o respuestas fallidas de la API
            throw new Error(error.message || "Failed to connect to the Arduino")
        })
}

export default arduinoConnectApp