function toggleBlink() {
    fetch(`${import.meta.env.VITE_API_URL}/arduino/controller/led`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'toggleBlink' }),
    })
        .then(response => response.json())
        .then(data => //console.log("Blink toggled:", data))
        .catch(error => console.error('Error:', error));
}

export default toggleBlink