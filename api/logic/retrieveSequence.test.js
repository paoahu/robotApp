import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import retrieveSequence from './retrieveSequence.js'

(async () => {

    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const sequences = await retrieveSequence('65f87c2308a1e799bf76409f')
        console.log('retrieves user sequences', sequences)
    } catch (error) {
        console.error(error)

    }
})()