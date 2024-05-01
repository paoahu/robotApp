import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import toggleLikeTutorial from './toggleLikeTutorial.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        await toggleLikeTutorial('65df64c91b58c18d63b7d95a', '65e3535d626e6236ba898b28')
        console.log('tutorial like toggle')
    } catch (error) {
        console.error(error)
    }
})()