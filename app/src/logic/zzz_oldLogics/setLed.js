function setLed(on) {
    // Esta función podría enviar una acción 'turnOn' o 'turnOff' dependiendo del valor de 'on'
    const action = on ? 'turnOn' : 'turnOff';
    fetch(`${import.meta.env.VITE_API_URL}/arduino/controller/led`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
    })
        .then(response => response.json())
        .then(data => //console.log(data))
        .catch(error => console.error('Error:', error))
}

export default setLed