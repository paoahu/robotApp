import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import ottoStop from './ottoStop.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await ottoStop()
        console.log('Otto is walking')
    } catch (error) {
        console.log(error)
    }

})()