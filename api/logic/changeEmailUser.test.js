import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import changeEmailUser from './changeEmailUser.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await changeEmailUser('65d8d877570c182389188fb3', 'man@darina2.com', 'man@darina2.com', '123123123')
        console.log('email changed')
    } catch (error) {
        console.log(error)
    }
})()