import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import changePassword from './changePassword.js'
import { errors } from 'com'
import { User } from '../data/models.js'
const { NotFoundError, CredentialsError, DuplicityError } = errors

describe('changePassword', () => {
    before(async function () {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })

    beforeEach(async function () {
        await User.deleteMany()
    })

    it('succeeds on correct credentials', async () => {

        const name = random.name()
        const email = random.email()
        const password = random.password()
        const newPassword = random.password()
        const robot = random.robot()
        const role = 'user'

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash, robot, role })

        await changePassword(user.id, password, newPassword, newPassword)

        const updatedUser = await User.findById(user.id)

        expect(updatedUser).to.exist

        const match = await bcrypt.compare(newPassword, updatedUser.password)
        expect(match).to.be.true


    })

    it('fails on wrong current password', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const wrongPassword = random.password()
        const newPassword = random.password()
        const robot = random.robot()
        const role = 'user'

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash, robot, role })

        try {

            await changePassword(user.id, wrongPassword, newPassword, newPassword)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong password')
        }
    })

    it('fails if new password and current password are the same', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const robot = random.robot()
        const role = 'user'


        const hash = await bcrypt.hash(password, 8)

        const user = await User.create({ name, email, password: hash, robot, role })

        try {

            await changePassword(user.id, password, password, password)
            throw new Error('should not reach this point')
        } catch (error) {

            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal('New password must be different from current one')
        }
    })

    it('fails if new password and repeat new password do not match', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const newPassword = random.password()
        const newPasswordRepeat = newPassword + 'mismatch'
        const robot = random.robot()
        const role = 'user'


        const hash = await bcrypt.hash(password, 8)

        const user = await User.create({ name, email, password: hash, robot, role })

        try {

            await changePassword(user.id, password, newPassword, newPasswordRepeat)
            throw new Error('should not reach this point')
        } catch (error) {

            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('The new password and the confirmation do not match')
        }
    })



    after(async function () {
        await mongoose.disconnect()
    })
})






