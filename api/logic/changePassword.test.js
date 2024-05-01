import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import changePassword from './changePassword.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {
        await changePassword('65d8d877570c182389188fb3', '123123123', '456456456', '456456456')
        console.log('password changed')
    } catch (error) {
        console.log(error)
    }
})()