import { validate, errors } from 'com'
import { User, Tutorial } from '../data/models.js'
const { SystemError, NotFoundError, ValidationError, PermissionError } = errors

function editTutorial(userId, tutorialId, { title, text }) {

    validate.id(userId, 'user id')
    validate.id(tutorialId, 'tutorial id')

    if (title !== undefined) {
        validate.text(title, 'title')
    }

    if (text !== undefined) {
        validate.text(text, 'text')
    }



    return (async () => {

        let tutorial

        try {
            tutorial = await Tutorial.findById(tutorialId)
        } catch (error) {

            throw new SystemError(error.message)

        }

        if (!tutorial) {
            throw new NotFoundError('Tutorial not found')
        }

        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')

        if (user.role !== 'admin') {
            throw new PermissionError('User has no permission to edit the tutorial')
        }

        if (title !== undefined) {
            tutorial.title = title
        }

        if (text !== undefined) {
            tutorial.text = text
        }

        await tutorial.save()

        return tutorial


    })()

}

export default editTutorial