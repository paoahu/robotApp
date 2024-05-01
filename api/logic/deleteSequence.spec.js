import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import deleteSequence from './deleteSequence.js'
import { errors } from 'com'
import { User, Tutorial, SequenceMovement } from '../data/models.js'
const { NotFoundError, CredentialsError, DuplicityError, PermissionError, ReferenceError } = errors

describe('deleteSequence', () => {

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })

    beforeEach(async () => {
        await User.deleteMany()
        await SequenceMovement.deleteMany()
    })

    it('should allow a user to delete their own sequence', async () => {

        const userData = {
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'user'
        }
        const user = await User.create(userData)



        const sequenceData = {
            userId: user._id,
            movements: [],
            createdAt: new Date()
        }

        const sequence = await SequenceMovement.create(sequenceData)

        await deleteSequence(user._id.toString(), sequence._id.toString())

        const deletedSequence = await SequenceMovement.findById(sequence._id)
        expect(deletedSequence).to.be.null
    })

    it('fails on non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId().toString()
        const sequenceId = new mongoose.Types.ObjectId().toString()

        try {
            await deleteSequence(nonExistingUserId, sequenceId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')
        }
    })

    it('fails on non-existing sequence', async () => {
        const userData = {
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'user'
        }
        const user = await User.create(userData)
        const nonExistingSequenceId = new mongoose.Types.ObjectId().toString()

        try {
            await deleteSequence(user._id.toString(), nonExistingSequenceId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Sequence not found')
        }
    })

    it('fails if user is not sequence owner', async () => {

        const userData = {
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'user'
        }
        const user = await User.create(userData)

        const sequenceData = {
            userId: user._id,
            movements: [],
            createdAt: new Date()
        }

        const sequence = await SequenceMovement.create(sequenceData)

        const anotherUser = await User.create({
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'user'
        })


        try {
            await deleteSequence(anotherUser._id.toString(), sequence._id.toString())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
        }
    })

    after(async () => {
        await mongoose.disconnect()
    })
})