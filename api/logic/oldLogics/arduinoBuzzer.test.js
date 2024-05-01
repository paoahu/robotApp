import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import arduinoBuzzer from './arduinoBuzzer.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await arduinoBuzzer()
        console.log('monitor is working')
    } catch (error) {
        console.log(error)
    }

})()