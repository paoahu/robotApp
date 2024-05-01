import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import arduinoLed from './arduinoLed.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await arduinoLed()
        console.log('Led on')
    } catch (error) {
        console.log(error)
    }

})()