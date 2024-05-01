
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import registerUser from './registerUser.js'
(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {

        await registerUser('Patata Frita', 'patata@frita.com', '123123123', 'humanoid', 'admin')
        console.log('user registered')

    } catch (error) {

        console.log(error)

    }
})()