import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import arduinoServosCenter from './arduinoServosCenter.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await arduinoServosCenter()
        console.log('Otto is center')
    } catch (error) {
        console.log(error)
    }

})()