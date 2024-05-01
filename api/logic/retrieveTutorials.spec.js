import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import retrieveTutorials from './retrieveTutorials.js'
import { errors } from 'com'
import { User, Tutorial } from '../data/models.js'
const { NotFoundError, CredentialsError, DuplicityError, PermissionError, ReferenceError } = errors

describe('retrieveTutorials', () => {

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })


    it('should retrieve tutorials with correct formatting', async () => {

        const userData = {
            name: random.name(),
            email: random.email(),
            password: 'password',
            robot: 'Otto',
            role: 'user',
        }
        const user = await User.create(userData)


        const tutorialData1 = {
            author: user._id,
            title: random.text(),
            text: random.text(),
            likes: [user._id],
            comments: [{ author: user._id, text: random.text() }],
        }
        await Tutorial.create(tutorialData1)




        const retrievedTutorials = await retrieveTutorials(user._id.toString())

        expect(retrievedTutorials.length).to.be.greaterThan(0)
        const tutorial = retrievedTutorials[0]



        expect(tutorial).to.have.property('id')
        expect(tutorial).to.have.property('title')
        expect(tutorial).to.have.property('text')
        expect(tutorial).to.have.property('liked').that.is.a('boolean')
        expect(tutorial).to.have.property('likes').that.is.an('array')
        expect(tutorial).to.have.property('comments').that.is.an('array')

    })

    it('fails on non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId().toString()

        try {
            await retrieveTutorials(nonExistingUserId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
        }
    })

    after(async () => {
        await mongoose.disconnect()
    })

})