import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import retrieveSequence from './retrieveSequence.js'
import { errors } from 'com'
import { User, Tutorial, SequenceMovement, Movement } from '../data/models.js'
const { NotFoundError, CredentialsError, DuplicityError, PermissionError, ReferenceError, ValidationError } = errors

describe('retrieveSequence', () => {

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })

    beforeEach(async () => {
        await User.deleteMany()
        await SequenceMovement.deleteMany()
    })

    it('should retrieve sequence for a user', async () => {

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

        const sequenceData1 = await SequenceMovement.create({
            userId: user._id,
            movements: movements,
            createdAt: new Date()
        })

        const sequenceData2 = await SequenceMovement.create({
            userId: user._id,
            movements: movements,
            createdAt: new Date()
        })

        const sequence1 = await SequenceMovement.create(sequenceData1)
        const sequence2 = await SequenceMovement.create(sequenceData2)

        const retrievedSequences = await retrieveSequence(user._id.toString())
        expect(retrievedSequences).to.have.lengthOf(2)

    })

    it('fails on non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId().toString()
        try {
            await retrieveSequence(nonExistingUserId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
        }
    })

})