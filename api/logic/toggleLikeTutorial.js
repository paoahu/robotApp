import { validate, errors } from 'com'

import { Tutorial, User } from '../data/models.js'

const { SystemError, NotFoundError } = errors

function toggleLikeTutorial(userId, tutorialId) {

    validate.id(userId, "user id")
    validate.id(tutorialId, "tutorial id")

    return (async () => {

        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')

        let tutorial

        try {
            tutorial = await Tutorial.findById(tutorialId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!tutorial)
            throw new NotFoundError('Tutorial not found')

        let index = tutorial.likes.indexOf(userId)
        if (index !== -1) {
            tutorial.likes.splice(index, 1)
        } else {
            tutorial.likes.push(userId)
        }

        try {
            await tutorial.save()
        } catch (error) {
            throw new SystemError(error.message)

        }
    })()
}

export default toggleLikeTutorial