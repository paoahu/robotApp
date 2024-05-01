import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import arduinoOled from './arduinoOled.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await arduinoOled()
        console.log('Led on')
    } catch (error) {
        console.log(error)
    }

})()