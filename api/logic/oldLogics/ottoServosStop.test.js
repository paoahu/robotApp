import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import ottoServosStop from './ottoServosStop.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await ottoServosStop()
        console.log('Servo stop')
    } catch (error) {
        console.log(error)
    }

})()