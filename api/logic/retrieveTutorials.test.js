import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import retrieveTutorials from './retrieveTutorials.js'

(async () => {

    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const tutorials = await retrieveTutorials('65d8d9dffdfc051c2e6c1e96')
        console.log('retrieved', tutorials)

    } catch (error) {
        console.error(error)

    }
})()