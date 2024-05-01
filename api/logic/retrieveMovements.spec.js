import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import retrieveMovements from './retrieveMovements.js'
import { User, Movement, SequenceMovement } from '../data/models.js'
import { errors } from 'com'
const { NotFoundError, SystemError } = errors
const { ObjectId } = mongoose.Types

describe('retrieveMovements', () => {

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })

    beforeEach(async () => {
        await User.deleteMany()
        await SequenceMovement.deleteMany()
    })

    it('should retrieve movements for a user and sequence', async () => {

        const userData = {
            name: random.name(),
            email: random.email(),
            password: await bcrypt.hash(random.password(), 8),
            robot: random.robot(),
            role: 'user'
        }
        const user = await User.create(userData)

        const movements = [
            { name: 'Move1', type: 'forward', ordinal: 0, steps: 10, T: 100, h: 20 },
            { name: 'Move2', type: 'backward', ordinal: 1, steps: 10, T: 100, h: 20 }
        ]

        const sequenceData = await SequenceMovement.create({
            userId: user._id,
            movements: movements,
            createdAt: new Date()
        })

        const sequence = await SequenceMovement.create(sequenceData)

        const retrievedMovements = await retrieveMovements(user._id.toString(), sequence._id.toString())
        expect(retrievedMovements.length).to.equal(2)

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
            await retrieveMovements(user._id.toString(), nonExistingSequenceId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(SystemError)
            expect(error.message).to.equal(`Sequence with id ${nonExistingSequenceId} not found`)
        }
    })

    it('fails if the user does not exist', async function () {
        const nonExistingUserId = new mongoose.Types.ObjectId().toString()
        const sequenceId = new mongoose.Types.ObjectId().toString()

        try {
            await retrieveMovements(nonExistingUserId, sequenceId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')
        }
    })



})