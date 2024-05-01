import { SerialPort } from 'serialport'
import { errors } from 'com'
const { BluetoothError } = errors

//serialport es una biblioteca de Node.js que permite la comunicación serial
//permite a mi programa Node.js comunicarse con dispositivos conectados a 
//puertos seriales de mi ordenador, como el módulo Bluetooth HC-05



const port = new SerialPort({ //creamos una instancia de serialPort
    path: '/dev/tty.HC05', //que está configurada para conectarse al dispositivo en el path '/dev/tty.HC05' que es la ruta de mi módulo Bluetooth
    baudRate: 9600 //la tasa de baudios
}, function (err) { //este cosntructor acepta un callback por si hay error
    if (err) {
        console.log('Error: ', err.message)
    }
})

// Esta función intenta establecer conexión y enviar un mensaje "Connection Established" al dispositivo conectado a través del puerto serial
export function arduinoConnect() {
    return new Promise((resolve, reject) => {
        // Enviar 'H' para encender el LED como parte del mensaje de establecimiento de conexión
        port.write("H\n", function (err) {
            if (err) {
                reject(new BluetoothError("Failed to establish Bluetooth connection"))
            } else {
                resolve("LED Turned On")
            }
        })
    })
}