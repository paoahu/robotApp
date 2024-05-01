import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Form, Field } from '../library/index'
import logic from '../logic'
import { useContext } from '../hooks'


export default function Profile() {


    const navigate = useNavigate()

    const context = useContext()




    const [userData, setUserData] = useState(null)

    useEffect(() => {
        logic.retrieveUserInfo()
            .then(data => {
                setUserData(data)
            })
            .catch(error => {
                context.handleError(error)
            })
    }, [])

    const [showChangePassword, setShowChangePassword] = useState(null)
    const [showChangeEmail, setShowChangeEmail] = useState(null)





    function handleChangePasswordSubmit(event) {
        event.preventDefault()

        const passwordInput = event.target.querySelector("#password-input")
        const newPasswordInput = event.target.querySelector("#new-password-input")
        const repeatNewPasswordInput = event.target.querySelector("#repeat-new-password-input")

        const password = passwordInput.value
        const newPassword = newPasswordInput.value
        const repeatNewPassword = repeatNewPasswordInput.value

        try {
            logic.changePassword(password, newPassword, repeatNewPassword)

                .then(() => {

                    alert("Password changed")
                    event.target.reset()

                    navigate('/')

                })

                .catch(error => context.handleError(error))

        } catch (error) {
            context.handleError(error)
        }
    }

    function handleChangeEmailSubmit(event) {
        event.preventDefault()

        const newEmailInput = event.target.querySelector("#new-email-input")
        const newEmailConfirmInput = event.target.querySelector("#new-email-confirm-input")
        const passwordInput = event.target.querySelector("#password-input")

        const newEmail = newEmailInput.value
        const newEmailConfirm = newEmailConfirmInput.value
        const password = passwordInput.value

        try {
            logic.changeEmail(newEmail, newEmailConfirm, password)
                .then(() => {

                    alert("E-mail changed")

                    event.target.reset()
                    navigate('/')

                })
                .catch(error => context.handleError(error))


        } catch (error) {
            context.handleError(error)
        }
    }

    function toggleChangePassword() {
        setShowChangePassword(!showChangePassword)
    }

    function toggleChangeEmail() {
        setShowChangeEmail(!showChangeEmail)

    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="profile-container">
                <h2 className="h2-robotic-profile">Profile</h2>
                <img src="/ottoProfile1.png" alt="Descripción del GIF" />

                <div className="userData">
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Robot: {userData.robot}</p>
                    <p>Role: {userData.role}</p>
                </div>
                <div className="changeProfile">
                    <button className="button-changeEmail" onClick={toggleChangeEmail}>Change E-mail</button>
                    {showChangeEmail && (
                        <div>
                            <h3 className="h3-robotic-profile">Change Email</h3>
                            <Form onSubmit={handleChangeEmailSubmit}>
                                <Field id="new-email-input" type="email">New e-mail</Field>
                                <Field id="new-email-confirm-input" type="email">Confirm new e-mail</Field>
                                <Field id="password-input" type="password">Password</Field>


                                <button className="button-update" type="submit">Update e-mail</button>
                            </Form>
                        </div>
                    )}
                    <button className="button-changePassword" onClick={toggleChangePassword}>Change Password</button>
                    {showChangePassword && (
                        <div>
                            <h3 className="h3-robotic-profile">Change Password</h3>
                            <Form onSubmit={handleChangePasswordSubmit}>
                                <Field id="password-input" type="password">Current password</Field>
                                <Field id="new-password-input" type="password">New password</Field>
                                <Field id="repeat-new-password-input" type="password">Repit new password</Field>


                                <button className="button-update" type="submit">Update password</button>
                            </Form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}