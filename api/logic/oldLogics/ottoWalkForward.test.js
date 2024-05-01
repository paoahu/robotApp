import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import ottoWalkForward from './ottoWalkForward.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await ottoWalkForward()
        console.log('Otto is walking')
    } catch (error) {
        console.log(error)
    }

})()