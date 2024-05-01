import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import createTutorial from './createTutorial.js'
import { errors } from 'com'
import { User, Tutorial } from '../data/models.js'
const { NotFoundError, CredentialsError, DuplicityError, PermissionError, ReferenceError } = errors

describe('createTutorial', () => {

    let admin, user, tutorial

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })

    beforeEach(async () => {
        await User.deleteMany()
        await Tutorial.deleteMany()
    })

    it('should allow an admin to create a tutorial', async () => {
        const adminData = {
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'admin'
        }
        admin = await User.create(adminData)

        const title = random.text()
        const text = random.text()

        await createTutorial(admin._id.toString(), title, text)

        const tutorials = await Tutorial.find()
        expect(tutorials.length).to.equal(1)
        expect(tutorials[0].title).to.equal(title)
        expect(tutorials[0].text).to.equal(text)

    })

    it('fails on non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId().toString()
        const title = random.text()
        const text = random.text()

        try {
            await createTutorial(nonExistingUserId, title, text)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
        }
    })

    it('fails if user has no permission to create a tutorial', async () => {
        const userData = {
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'user'
        }
        const user = await User.create(userData)

        const title = random.text()
        const text = random.text()

        try {
            await createTutorial(user._id.toString(), title, text)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(PermissionError)
        }
    })

    after(async () => {
        await mongoose.disconnect()
    })

})