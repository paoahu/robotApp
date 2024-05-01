import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import editTutorial from './editTutorial.js'
import { errors } from 'com'
import { User, Tutorial } from '../data/models.js'
const { NotFoundError, CredentialsError, DuplicityError, PermissionError, ReferenceError } = errors

describe('editTutorial', () => {

    let admin, user, tutorial

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })

    beforeEach(async () => {
        await User.deleteMany()
        await Tutorial.deleteMany()

        const adminData = {
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'admin'
        }
        admin = await User.create(adminData)

        const userData = {
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'user'
        }
        user = await User.create(userData)

        const tutorialData = {
            title: random.text(),
            text: random.text(),
            author: admin._id
        }
        tutorial = await Tutorial.create(tutorialData)
    })

    it('should allow an admin to edit a tutorial', async () => {
        const newTitle = random.text()
        const newText = random.text()

        const editedTutorial = await editTutorial(admin._id.toString(), tutorial._id.toString(), { title: newTitle, text: newText })

        expect(editedTutorial).to.exist
        expect(editedTutorial.title).to.equal(newTitle)
        expect(editedTutorial.text).to.equal(newText)
    })

    it('fails on non-existing tutorial', async () => {
        const nonExistingTutorialId = new mongoose.Types.ObjectId().toString()
        const newTitle = random.text()
        const newText = random.text()

        try {
            await editTutorial(admin._id.toString(), nonExistingTutorialId, { title: newTitle, text: newText })
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Tutorial not found')
        }
    })

    it('fails on non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId().toString()
        const tutorialId = tutorial._id.toString()
        const newTitle = random.text()
        const newText = random.text()

        try {
            await editTutorial(nonExistingUserId, tutorialId, { title: newTitle, text: newText })
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')
        }
    })

    it('fails if user has no permission to edit the tutorial', async () => {
        const tutorialId = tutorial._id.toString()
        const newUser = await User.create({ name: random.name(), email: random.email(), password: '1234', robot: random.robot(), role: 'user' })
        const newTitle = random.text()
        const newText = random.text()

        try {
            await editTutorial(newUser._id.toString(), tutorialId, { title: newTitle, text: newText })
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(PermissionError)
            expect(error.message).to.equal('User has no permission to edit the tutorial')
        }
    })





    after(async () => {
        await mongoose.disconnect()
    })

})