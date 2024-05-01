import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import arduinoServo from './arduinoServo.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await arduinoServo()
        console.log('Servo sweep started')
    } catch (error) {
        console.log(error)
    }

})()