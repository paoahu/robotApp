import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import editTutorial from './editTutorial.js'



(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        await editTutorial('65d8d9dffdfc051c2e6c1e96', '65eb7e79de71b35b1d978f5b', { title: 'Nuevo ', text: 'Texto' })
        console.log('tutorial edited')
    } catch (error) {

    }


})()