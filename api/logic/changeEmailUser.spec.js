import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import changeEmailUser from './changeEmailUser.js'
import { errors } from 'com'
import { User } from '../data/models.js'
const { NotFoundError, CredentialsError, ContentError } = errors

describe('changeEmailUser', () => {

    before(async () => await mongoose.connect(process.env.TEST_MONGODB_URL))
    beforeEach(async () => await User.deleteMany())

    it('succeeds on correct credenttials', async () => {

        const name = random.name()
        const email = random.email()
        const newEmail = random.email()
        const password = random.password()
        const robot = random.robot()
        const role = 'user'

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash, robot, role })

        await changeEmailUser(user.id, newEmail, newEmail, password)

        const updatedUser = await User.findById(user.id)

        expect(updatedUser).to.exist
        expect(updatedUser.email).to.be.a('string')
        expect(updatedUser.email).to.equal(newEmail)


    })

    it('fails on non-existing user', async () => {
        const userId = new mongoose.Types.ObjectId()
        const newEmail = random.email()
        const password = random.password()

        try {
            await changeEmailUser(userId.toString(), newEmail, newEmail, password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on email and confirmation mismatch', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const newEmail = random.email()
        const newEmailConfirm = newEmail + 'mismatch'
        const robot = random.robot()
        const role = 'user'

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash, robot, role })

        try {
            await changeEmailUser(user.id, newEmail, newEmailConfirm, password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('new email and its confirmation do not match')
        }
    })

    it('fails on wrong password', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const newEmail = random.email()
        const robot = random.robot()
        const role = 'user'

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash, robot, role })

        try {
            await changeEmailUser(user.id, newEmail, newEmail, password + 'wrong')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong password')
        }
    })

    after(async () => await mongoose.disconnect())


})