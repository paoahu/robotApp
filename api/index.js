import dotenv from 'dotenv'
dotenv.config()


import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import logic from './logic/index.js'


import {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    retrieveUserInfoHandler,
    ottoControllerHandler,
    createTutorialHandler,
    retrieveTutorialHandler,
    toggleLikeTutorialHandler,
    deleteTutorialHandler,
    retrieveSequenceHandler,
    deleteSequenceHandler,
    editSequenceHandler,
    retrieveMovementsHandler,
    changeEmailHandler,
    changePasswordHandler,
    editTutorialHandler





} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URL)

    .then(() => {
        const server = express()
        server.get('/', (req, res) => res.send('Hello world'))

        const jsonBodyParser = express.json()

        server.use(cors())









        //usar el metodo POST para hacer el registro
        server.post('/users', jsonBodyParser, registerUserHandler)

        //Authenticate User
        server.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        // Retrieve User
        server.get('/users', retrieveUserHandler)

        // Retrieve User Info / Profile
        server.get('/users/me', retrieveUserInfoHandler)

        //change email User
        server.patch('/users/me/change-email', jsonBodyParser, changeEmailHandler)

        //change password User
        server.patch('/users/me/change-password', jsonBodyParser, changePasswordHandler)

        //Create Tutorial
        server.post('/tutorials', jsonBodyParser, createTutorialHandler)

        //Retrieve Tutorials
        server.get('/tutorials', retrieveTutorialHandler)

        //Toggle Like Tutorials
        server.patch('/tutorials/:tutorialId/likes', jsonBodyParser, toggleLikeTutorialHandler)

        //Delete Tutorials
        server.delete('/tutorials/:tutorialId', deleteTutorialHandler)

        //Edit Tutorial
        server.patch('/tutorials/:tutorialId', jsonBodyParser, editTutorialHandler)

        //Retrieve Sequence
        server.get('/arduino/controller/ottoController', retrieveSequenceHandler)

        //Delete Sequence
        server.delete('/arduino/controller/ottoController/:sequenceId', deleteSequenceHandler)

        //Edit Sequence
        server.patch('/arduino/controller/ottoController/:sequenceId', jsonBodyParser, editSequenceHandler)

        //Retrieve Movements
        server.get('/arduino/controller/ottoController/:sequenceId', retrieveMovementsHandler)













        // Arduino Connect


        server.post('/arduino/controller/ottoController', jsonBodyParser, ottoControllerHandler)



        server.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))

    })
    .catch(error => console.error(error))