import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import deleteTutorial from './deleteTutorial.js'
import { errors } from 'com'
import { User, Tutorial, SequenceMovement } from '../data/models.js'
const { NotFoundError, CredentialsError, DuplicityError, PermissionError, ReferenceError } = errors

describe('deleteTutorial', () => {

    let admin, user;

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })

    beforeEach(async () => {
        await User.deleteMany()
        await Tutorial.deleteMany()


        admin = await User.create({
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'admin'
        })

        user = await User.create({
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'user'
        })
    })

    it('should allow an admin to delete a tutorial', async () => {
        const tutorialData = {
            author: admin._id,
            title: random.text(),
            text: random.text()
        }
        const tutorial = await Tutorial.create(tutorialData)

        await deleteTutorial(admin._id.toString(), tutorial._id.toString())

        const deletedTutorial = await Tutorial.findById(tutorial._id)
        expect(deletedTutorial).to.be.null
    })

    it('fails on non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId().toString()
        const tutorialId = new mongoose.Types.ObjectId().toString()

        try {
            await deleteTutorial(nonExistingUserId, tutorialId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Tutorial not found')
        }
    })

    it('fails on non-existing tutorial', async () => {
        const nonExistingTutorialId = new mongoose.Types.ObjectId().toString()

        try {
            await deleteTutorial(admin._id.toString(), nonExistingTutorialId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Tutorial not found')
        }
    })

    it('fails if user has no permission to delete the tutorial', async () => {
        const tutorialData = {
            author: admin._id,
            title: random.text(),
            text: random.text()
        }
        const tutorial = await Tutorial.create(tutorialData)

        try {
            await deleteTutorial(user._id.toString(), tutorial._id.toString())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(PermissionError)
            expect(error.message).to.equal('User has no permission to create a tutorial')
        }
    })

    after(async () => {
        await mongoose.disconnect()
    })

})