import { validate, errors } from 'com'
import { User } from '../data/models.js'
const { SystemError, NotFoundError } = errors
function retrieveUserInfo(userId) {
    validate.id(userId, 'user id')

    return (async () => {

        let user

        try {

            user = await User.findById(userId).select('name email robot role')
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')



        return user

    })()

}

export default retrieveUserInfo