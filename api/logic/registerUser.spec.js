
import dotenv from 'dotenv'
dotenv.config()

import mongoose from "mongoose";

import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import registerUser from './registerUser.js'
import { errors } from 'com'
import { User } from '../data/models.js'
const { DuplicityError } = errors

describe('registerUser', () => {
    before(async () => await mongoose.connect(process.env.TEST_MONGODB_URL))
    beforeEach(async () => await User.deleteMany())
    it('succeds on new user', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const robot = random.robot()
        await registerUser(name, email, password, robot)

        const user = await User.findOne({ email })


        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.email).to.equal(email)
        expect(user.role).to.equal('user')

        const match = await bcrypt.compare(password, user.password)
        expect(match).to.be.true

    })

    it('fails on already existing user', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const robot = random.robot()
        const role = 'user'

        await User.create({ name, email, password, robot, role })

        try {
            await registerUser(name, email, password, robot)
            throw new Error('should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal('user already exists')

        }

    })

    after(async () => await mongoose.disconnect())
})