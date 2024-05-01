import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import arduinoLCD from './arduinoLCD.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await arduinoLCD('hola :D')
        console.log('monitor is working')
    } catch (error) {
        console.log(error)
    }

})()