import { validate, errors } from 'com'
import { Tutorial, User } from '../data/models.js'

const { SystemError, NotFoundError, PermissionError } = errors

function createTutorial(userId, title, text) {
    validate.id(userId, 'user id')
    validate.text(title, 'title')
    validate.text(text, 'text')

    return (async () => {

        let user

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')

        if (user.role !== 'admin')
            throw new PermissionError('User has no permission to create a tutorial')

        try {
            await Tutorial.create({ author: userId, title, text })
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createTutorial