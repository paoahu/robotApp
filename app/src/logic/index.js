
import registerUser from './registerUser'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import retrieveUserInfo from './retrieveUserInfo'
import retrieveTutorials from './retrieveTutorials'
import publishTutorial from './publishTutorial'
import toggleLikeTutorial from './toggleLikeTutorial'
import deleteTutorial from './deleteTutorial'
import editTutorial from './editTutorial'


import isUserLoggedIn from './isUserLoggedIn'

import arduinoLCD from './arduinoLCD'

import ottoController from './ottoControler'
import retrieveSequence from './retrieveSequence'
import deleteSequence from './deleteSequence'
import editSequence from './editSequence'
import retrieveMovements from './retrieveMovements'

import changeEmail from './changeEmail'
import changePassword from './changePassword'


const logic = {
    registerUser,
    loginUser,
    logoutUser,
    retrieveUser,
    isUserLoggedIn,
    retrieveTutorials,
    publishTutorial,
    toggleLikeTutorial,
    deleteTutorial,
    editTutorial,


    retrieveUserInfo,
    retrieveSequence,
    deleteSequence,
    editSequence,
    retrieveMovements,

    changeEmail,
    changePassword,



    ottoController,
    arduinoLCD
}

export default logic
