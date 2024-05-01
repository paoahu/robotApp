import mongoose from 'mongoose'

const { Schema, model, ObjectId } = mongoose


const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 8
    },
    robot: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']

    },
    favs: [{
        type: ObjectId,
        ref: 'Tutorial'
    }]
})

const movement = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['forward', 'backward', 'left', 'right', 'jump', 'turnRight', 'turnLeft', 'stop', 'snakeMove', 'crusaito', 'moonwalker', 'swing', 'shakeLegLeft', 'shakeLegRight', 'noGravity', 'kickLeft', 'upDown']
    },
    ordinal: {
        type: Number,
        required: true
    },
    steps: Number,
    T: Number,
    h: Number,
    dir: String,
    tempo: Number


})

const sequenceMovement = new Schema({
    userId: {
        type: ObjectId,

        ref: 'User'
    },
    movements: [movement],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const tutorial = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [{
        author: { type: ObjectId, ref: 'User' },
        text: { type: String, required: true }

    }]
})


const User = model('User', user)
const Tutorial = model('Tutorial', tutorial)
const Movement = model('Movement', movement)
const SequenceMovement = model('SequenceMovement', sequenceMovement)

export {
    User, Tutorial, Movement, SequenceMovement
}