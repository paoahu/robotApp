import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import deleteTutorial from './deleteTutorial.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        await deleteTutorial('65d8d9dffdfc051c2e6c1e96', '65e4bccbac8ea03606905796')
        console.log('tutorial deleted')
    } catch (error) {
        console.log(error)
    }
})()

