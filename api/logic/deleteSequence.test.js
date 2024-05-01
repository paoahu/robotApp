import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import deleteSequence from './deleteSequence.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        await deleteSequence('65df64c91b58c18d63b7d95a', '65e80ecba22edff9e8c330be')
        console.log('sequence deleted')
    } catch (error) {
        console.log(error)
    }
})()