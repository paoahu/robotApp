
import { expect } from 'chai'
import sinon from 'sinon'
import { SerialPort } from 'serialport'
import { arduinoConnect } from './arduinoConnect.js'
import { errors } from 'com'
const { BluetoothError } = errors

//importamos los módulos necesarios para el test. Para usar mocha chai, necesitamos simular
//el módulo serialPort. Como Mocha no tiene un sistema de mocking integrado, tenemos que
//usar una librería adicional "sinon" (crea el stub de serialPort)

describe('arduinoConnect', function () {
    let writeStub //creams el stub

    before(function () {
        // Antes de los tests, se reemplaza el método write de SerialPort con un stub de Sinon
        // este stub intercepta las llamadas al método write y ejecuta la función proporcionada
        // que simplemente invoca el callback con null
        writeStub = sinon.stub(SerialPort.prototype, 'write').callsFake((data, callback) => {
            callback(null)
        })
    })

    after(function () {
        // cuando se completan los tests (after), se restaura el método write, para no afectar
        // a otros tests
        writeStub.restore()
    })

    // el test!!

    it('should resolve with "Connection Established" message', async function () {
        const result = await arduinoConnect() //invocamos arduinoConnect
        //usamos las aserciones de Chai con lo que esperamos
        expect(result).to.equal('Connection Established') //que devulva que la conexión se ha establecido
        expect(writeStub.calledOnce).to.be.true // Verifica que el stub de write haya sido llamado una vez
    })



    it('should reject if there is an error establishing the connection', async function () {

        writeStub.callsFake((data, callback) => {
            callback(new Error("Failed to write to serial port"))
        });

        // intenta ejecutar arduino y espera error
        try {
            await arduinoConnect()
            throw new Error("Expected arduinoConnect to reject")
        } catch (error) {
            expect(error).to.be.instanceOf(BluetoothError)
            expect(error.message).to.equal("Failed to establish Bluetooth connection")
        }

        // reseteamos el stub
        writeStub.resetBehavior()
    })
})