
import React from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'



import logic from './logic'

import { Button, Form, Field } from './library'
import Feedback from './components/Feedback'

import Context from './Context'

import { errors } from 'com'

const { ContentError, DuplicityError, NotFoundError, TokenError } = errors



function App() {



  const [level, setLevel] = React.useState(null)
  const [message, setMessage] = React.useState(null)
  const [userRole, setUserRole] = React.useState(null)


  const navigate = useNavigate()


  const handleRegisterShow = () => {

    navigate('/register')
    setMessage(null)
    setLevel(null)
  }

  const handleLoginShow = () => {

    navigate('/login')
    setMessage(null)
    setLevel(null)
  }

  const handleHomeShow = () => {

    navigate('/')
    setMessage(null)
    setLevel(null)
  }

  const handleError = error => {

    let level = 'fatal'
    let message = error.message

    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
      level = 'warn'

    else if (error instanceof DuplicityError || error instanceof NotFoundError)

      level = 'error'

    else if (error instanceof TokenError) {
      logic.logoutUser(() => navigate('/login'))
      message = 'Session expired'

    }


    setLevel(level)
    setMessage(message)
    console2.log(error.message, level)

  }

  const handleFeedbackAccepted = () => {
    setMessage(null)
    setLevel(null)
  }

  const setUserRoleInContext = (role) => {
    setUserRole(role)
  }



  const context = {
    handleError,
    userRole,
    setUserRole: setUserRoleInContext
  }





  return <>
    <Context.Provider value={context}>
      {message && <Feedback level={level} message={message} onAccepted={handleFeedbackAccepted} />}


      <Routes>
        <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />} />
        <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />} />
        <Route path='/*' element={logic.isUserLoggedIn() ? <Home onLogoutClick={handleLoginShow} /> : <Navigate to="/login" />} />
      </Routes>
    </Context.Provider>
  </>
}

export default App
