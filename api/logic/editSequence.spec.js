import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import random from './helpers/random.js'
import editSequence from './editSequence.js'
import { errors } from 'com'
import { User, Tutorial, SequenceMovement, Movement } from '../data/models.js'
const { NotFoundError, CredentialsError, DuplicityError, PermissionError, ReferenceError, ValidationError } = errors

describe('editSequence', () => {




    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL)
    })

    beforeEach(async () => {
        await User.deleteMany()
        await SequenceMovement.deleteMany()
    })



    it('should move a movement up in the sequence', async () => {

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

        await editSequence(sequence._id.toString(), sequence.movements[1]._id.toString(), 'moveUp')




        const updatedSequence = await SequenceMovement.findById(sequence._id).populate('movements')
        expect(updatedSequence.movements).to.have.lengthOf(2)
        expect(updatedSequence.movements[0].name).to.equal('Move2')
        expect(updatedSequence.movements[1].name).to.equal('Move1')

    })

    it('should move a movement down in the sequence', async () => {

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

        await editSequence(sequence._id.toString(), sequence.movements[0]._id.toString(), 'moveDown')




        const updatedSequence = await SequenceMovement.findById(sequence._id).populate('movements')
        expect(updatedSequence.movements).to.have.lengthOf(2)
        expect(updatedSequence.movements[0].name).to.equal('Move2')
        expect(updatedSequence.movements[1].name).to.equal('Move1')

    })



    it('should allow a user to edit their own sequence', async () => {

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

        await editSequence(sequence._id.toString(), sequence.movements[0]._id.toString(), 'delete')


        const updatedSequence = await SequenceMovement.findById(sequence._id).populate('movements')
        expect(updatedSequence.movements).to.have.lengthOf(1)
        expect(updatedSequence.movements[0].name).to.equal('Move2')
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
            await editSequence(user._id.toString(), nonExistingSequenceId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Sequence not found')
        }
    })

    it('fails on moveUp position', async () => {
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

        try {
            await editSequence(sequence._id.toString(), sequence.movements[0]._id.toString(), 'moveUp')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Movement is already at the top')
        }
    })

    it('fails on moveDown position', async () => {
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

        try {
            await editSequence(sequence._id.toString(), sequence.movements[1]._id.toString(), 'moveDown')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Movement is already at the bottom')
        }
    })



    after(async () => {
        await mongoose.disconnect()
    })


})