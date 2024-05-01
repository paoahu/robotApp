import { validate, errors } from 'com'

import { Tutorial, User } from '../data/models.js'

const { NotFoundError, CredentialsError, SystemError, PermissionError } = errors

function deleteTutorial(userId, tutorialId) {
    validate.id(userId, 'user id')
    validate.id(tutorialId, 'tutorial id')

    return (async () => {
        let tutorial

        try {
            tutorial = await Tutorial.findById(tutorialId)

        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!tutorial)
            throw new NotFoundError('Tutorial not found')

        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')

        if (user.role !== 'admin') {
            throw new PermissionError('User has no permission to create a tutorial')
        }

        let deletedTutorial

        try {
            deletedTutorial = await Tutorial.findByIdAndDelete(tutorialId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!deletedTutorial)
            throw new NotFoundError('Tutorial can\'t be deleted')

    })()
}

export default deleteTutorial