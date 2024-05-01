import { validate, errors } from 'com'
import { Tutorial, User } from '../data/models.js'
const { SystemError, NotFoundError } = errors

function retrieveTutorials(userId) {
    validate.id(userId, 'user id')

    return (async () => {

        let user

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('User not found')

        let tutorials

        try {
            tutorials = await Tutorial.find().populate('author', 'name').lean()
        } catch (error) {

            throw new SystemError(error.message)

        }

        tutorials.forEach(tutorial => {
            tutorial.id = tutorial._id.toString()
            delete tutorial._id

            if (tutorial.author && tutorial.author._id) {
                tutorial.author.id = tutorial.author._id.toString()
                delete tutorial.author._id
            }

            delete tutorial.__v

            tutorial.likes = tutorial.likes.map(userObjectId => userObjectId.toString())
            tutorial.liked = tutorial.likes.includes(userId)
            tutorial.comments = tutorial.comments.map(userObjectId => userObjectId.toString())
        })

        return tutorials
    })()
}

export default retrieveTutorials