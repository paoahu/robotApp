import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import logic from '../logic'

import { useContext } from '../hooks'




import { Button, Form, Link, Field } from '../library'

import Profile from './Profile'
import Controller from './Controller'
import Tutorials from './Tutorials'
import Forum from './Forum'


function Home(props) {

    const context = useContext()
    const { setUserRole } = context

    const [view, setView] = useState(null)
    const [name, setName] = useState(null)

    const [role, setRole] = useState(null)
    const [stamp, setStamp] = useState(null)




    const navigate = useNavigate()
    const location = useLocation()


    function handleLogoutClick() {
        logic.logoutUser(error => {
            if (error) {

                context.handleError(error)
                return
            }
        })

        props.onLogoutClick()
    }


    useEffect(() => {


        try {
            logic.retrieveUser()
                .then(user => {
                    setName(user.name)

                    setRole(user.role)
                    context.setUserRole(user.role)






                })
                .catch(error => context.handleError(error))


        } catch (error) {

            context.handleError(error)
        }
    }, [])



    function handleProfileClick(event) {
        event.preventDefault()

        navigate('/profile')
    }

    function handleTutorialClick(event) {
        event.preventDefault()

        navigate('/tutorials')
    }

    function handleForumClick(event) {
        event.preventDefault()

        navigate('/forum')

    }

    function handleHomeClick(event) {
        event.preventDefault()

        navigate('/')
    }

    function handleControllerClick(event) {
        event.preventDefault()

        navigate('/controller')
    }



    return (

        <div className="home-wrapper">
            <header className="header">
                <h1><Link onClick={handleHomeClick}>Home</Link></h1>


                <div>

                    <Link onClick={handleProfileClick}>{name}</Link>



                    <Button onClick={handleLogoutClick}>Logout</Button>
                </div>
            </header>

            <div className="home-container flex flex-col justify-between">


                {location.pathname === '/' && (
                    <>
                        <main>
                            <h2 className="h2-robotic">Welcome back,  </h2>
                            <h2 className="h2-robotic">{name} </h2>
                            <img src="/ottoHome4.gif" alt="Descripción del GIF" />
                            <div className="home-button-container">
                                <button className="home-connect-button button" onClick={handleControllerClick}>Connect</button>
                            </div>
                            <div className="home-button-container">
                                <button className="home-tutorials-button button" onClick={handleTutorialClick}>Tutorials</button>
                            </div>

                            <div className="home-button-container">
                                <button className="home-forum-button button" onClick={handleForumClick}>Forum</button>
                            </div>
                        </main>
                    </>
                )}





                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/controller" element={<Controller />} />
                    <Route path="/tutorials" element={<Tutorials loadTutorials={logic.retrieveTutorials} stamp={stamp} />} />
                    <Route path="/forum" element={<Forum />} />

                </Routes>



            </div>

        </div >)


}

export default Home