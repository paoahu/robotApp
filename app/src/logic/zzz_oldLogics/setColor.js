function setColor(color) {
    fetch(`${import.meta.env.VITE_API_URL}/arduino/controller/led`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'setColor', color: color }),
    })
        .then(response => response.json())
        .then(data => //console.log(data))
        .catch(error => console.error('Error:', error))
}

export default setColor