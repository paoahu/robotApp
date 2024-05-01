import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { SystemError, NotFoundError, CredentialsError, ContentError } = errors
function changeEmailUser(userId, newEmail, newEmailConfirm, password) {
    validate.id(userId, 'user id')
    validate.email(newEmail, 'new email')
    validate.email(newEmailConfirm, 'new email confirm')
    validate.text(password, 'password')

    return (async () => {

        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!user)
            throw new NotFoundError('user not found')

        if (newEmail !== newEmailConfirm)
            throw new ContentError('new email and its confirmation do not match')

        if (newEmail !== newEmailConfirm)
            throw new ContentError('new email and its confirmation do not match')

        let match

        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!match)
            throw new CredentialsError('wrong password')


        user.email = newEmail

        try {
            await user.save()
        } catch (error) {
            throw new SystemError(error.message)
        }


    })()

}
export default changeEmailUser