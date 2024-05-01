
import bcrypt from 'bcryptjs'
import { validate, errors } from 'com'
const { SystemError, NotFoundError, CredentialsError } = errors
import { User } from '../data/models.js'
function authenticateUser(email, password) {
    validate.email(email, 'email')
    validate.password(password, 'password')

    return (async () => {
        let user
        try {
            user = await User.findOne({ email })
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')

        let match
        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            throw new SystemError(error.message)

        }

        if (!match)
            throw new CredentialsError('wrong password')

        return user.id

    })()

}

export default authenticateUser