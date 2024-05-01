import pkg from 'johnny-five'
const { Board, LCD } = pkg


// TEXTO SIN DESPLAZAMIENTO
const arduinoLCD = (message) => {
    return new Promise((resolve, reject) => {
        const board = new Board();

        board.on("ready", () => {
            const lcd = new LCD({
                //controller: "PCF8574A"
                controller: "PCF8574"


            });

            try {
                // Limpiamos el LCD antes de escribir el mensaje para evitar sobreescrituras
                lcd.clear();

                // Mostramos el mensaje en la primera fila
                lcd.print(message);

                console.log("Message displayed: ", message);
                resolve("Message displayed successfully");

                // Opcionalmente, puedes limpiar el LCD después de un tiempo determinado
                setTimeout(() => {
                    lcd.clear();
                    console.log("LCD cleared");
                    resolve("LCD cleared after showing message.");
                }, 5000); // Ajusta este tiempo según lo que necesites

            } catch (error) {
                console.error("Error displaying message:", error);
                reject(error);
            }
        });

        board.on("error", (error) => {
            console.error('Board initialization failed:', error.message);
            reject(error);
        });
    });
};

export default arduinoLCD





