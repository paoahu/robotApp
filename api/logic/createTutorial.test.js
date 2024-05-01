import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import createTutorial from './createTutorial.js'

mongoose.connect(process.env.MONGODB_URL)

    .then(() => {
        try {
            createTutorial('65d8d9dffdfc051c2e6c1e96', 'Tutorial 1', 'Esto es el texto del tutorial. De monento es sólo una prueba.')
                .then(() => console.log('tutorial created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error)
        }

    })

    .catch(error => console.error(error))