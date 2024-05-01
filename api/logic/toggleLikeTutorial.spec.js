import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import toggleLikeTutorial from './toggleLikeTutorial.js'
import { errors } from 'com'
import { User, Tutorial } from '../data/models.js'
const { NotFoundError, CredentialsError, DuplicityError, PermissionError, ReferenceError } = errors

describe('toggleLikeTutorials', () => {

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })

    let userId, tutorialId

    beforeEach(async () => {
        await User.deleteMany()
        await Tutorial.deleteMany()


        const user = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
            robot: 'TestRobot',
            role: 'user',
        })
        await user.save()
        userId = user._id


        const tutorial = new Tutorial({
            author: userId,
            title: 'Test Tutorial',
            text: 'This is a test tutorial',
            likes: [],
            comments: [],
        })
        await tutorial.save()
        tutorialId = tutorial._id
    })

    it('should like a tutorial when not already liked', async () => {
        await toggleLikeTutorial(userId.toString(), tutorialId.toString())
        const updatedTutorial = await Tutorial.findById(tutorialId)
        expect(updatedTutorial.likes).to.include(userId)
    })

    it('should unlike a tutorial when already liked', async () => {

        await toggleLikeTutorial(userId.toString(), tutorialId.toString())

        await toggleLikeTutorial(userId.toString(), tutorialId.toString())
        const updatedTutorial = await Tutorial.findById(tutorialId)
        expect(updatedTutorial.likes).not.to.include(userId)
    })

    it('fails on non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId().toString()
        try {
            await toggleLikeTutorial(nonExistingUserId, tutorialId.toString())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')
        }
    })

    it('fails on non-existing tutorial', async () => {
        const nonExistingTutorialId = new mongoose.Types.ObjectId().toString()
        try {
            await toggleLikeTutorial(userId.toString(), nonExistingTutorialId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Tutorial not found')
        }
    })

    after(async () => {
        await mongoose.disconnect()
    })
})