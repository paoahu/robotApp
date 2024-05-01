import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'
import retrieveUser from './retrieveUser.js'
import { User } from '../data/models.js'
import { errors } from 'com'
const { NotFoundError } = errors
const { ObjectId } = mongoose.Types

describe('retrieveUser', () => {
    before(async () => await mongoose.connect(process.env.TEST_MONGODB_URL))
    beforeEach(async () => await User.deleteMany())
    it('succeed on existing user', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const robot = random.robot()
        const role = 'user'
        const newUser = await User.create({ name, email, password, robot, role })

        const user = await retrieveUser(newUser.id)

        expect(user.name).to.be.a('string')
        expect(user.name).to.equal(name)
        expect(user.id).to.be.undefined
        expect(user.password).to.be.undefined


    })

    it('fails on non-existing user', async () => {

        try {
            await retrieveUser(new ObjectId().toString())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')

        }


    })
    after(async () => await mongoose.disconnect())
})

