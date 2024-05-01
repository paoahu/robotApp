import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import retrieveUserInfo from './retrieveUserInfo.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    try {

        const user = await retrieveUserInfo('65d8d9dffdfc051c2e6c1e96')
        console.log('retrieved', user)

    } catch (error) {
        console.error(error)
    }
})()
