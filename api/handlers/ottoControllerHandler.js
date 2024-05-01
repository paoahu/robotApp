
import logic from '../logic/index.js'

import { errors } from 'com'
const { ContentError } = errors

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

export default (req, res) => {
    try {
        const { action, message, sequenceId, userId } = req.body

        switch (action) {
            case 'walkForward':
                logic.ottoController.walkForward().then(() => {
                    res.status(200).json({ message: 'Otto is walking' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;
            case 'walkBackward':
                logic.ottoController.walkBackward().then(() => {
                    res.status(200).json({ message: 'Otto is walking backward' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'finalDance':
                logic.ottoController.danceSing().then(() => {
                    res.status(200).json({ message: 'Otto is dancing' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'kickLeft':
                logic.ottoController.kickLeft(userId, 1000).then(() => {
                    res.status(200).json({ message: 'Otto is snaking' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;


            case 'noGravity':
                logic.ottoController.noGravity(userId).then(() => {
                    res.status(200).json({ message: 'Otto is snaking' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'snakeMove':
                logic.ottoController.snakeMove(userId).then(() => {
                    res.status(200).json({ message: 'Otto is snaking' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'upDown':
                logic.ottoController.upDown(userId, 4, 2000).then(() => {
                    res.status(200).json({ message: 'Otto is snaking' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'swing':
                logic.ottoController.swing(userId, 4, 1000, 40).then(() => {
                    res.status(200).json({ message: 'Otto is snaking' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'shakeLegRight':
                logic.ottoController.shakeLegRight(userId, 3, 1000).then(() => {
                    res.status(200).json({ message: 'Otto is shaking right leg' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'shakeLegLeft':
                logic.ottoController.shakeLegLeft(userId, 4, 1000).then(() => {
                    res.status(200).json({ message: 'Otto is shaking left leg' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'crusaito':
                logic.ottoController.crusaito(userId, 10, 2000, 70, 1).then(() => {
                    res.status(200).json({ message: 'Otto is doing crusaito' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'moonwalker':
                logic.ottoController.moonwalker(userId, 8, 1000, 30, 1).then(() => {
                    res.status(200).json({ message: 'Otto is doing crusaito' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'executeSequenceById':
                logic.ottoController.executeSequenceById(sequenceId).then(() => {
                    res.status(200).json({ message: 'Otto is reproducing the sequence' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'endSequence':


                if (!userId) {
                    return res.status(400).json({ message: 'userId is required to end a sequence.' })
                }
                logic.ottoController.endSequence(userId).then(() => {
                    res.status(200).json({ message: 'Sequence has stopped' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'turnRight':
                logic.ottoController.turn(5, 2000, RIGHT).then(() => {
                    res.status(200).json({ message: 'Otto is turning right' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'turnLeft':
                logic.ottoController.turn(5, 2000, LEFT).then(() => {
                    res.status(200).json({ message: 'Otto is turning left' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;

            case 'jump':
                logic.ottoController.jump(userId).then(() => {
                    res.status(200).json({ message: 'Otto is jumping' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;
            case 'stop':
                logic.ottoController.stop(userId).then(() => {
                    res.status(200).json({ message: 'Otto has stopped' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;
            case 'sayHi':
                if (message) {
                    logic.ottoController.sayHi(message).then(() => {
                        res.status(200).json({ message: `Message displayed: ${message}` })
                    }).catch(error => {
                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    })
                } else {
                    res.status(400).json({ message: 'Message is required for sayHi action' })
                }
                break;
            case 'clearLCD':
                logic.ottoController.clearLCD().then(() => {
                    res.status(200).json({ message: 'LCD cleared' })
                }).catch(error => {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                })
                break;
            default:
                res.status(400).json({ message: 'Invalid action' })
                break;
        }
    } catch (error) {
        let status = 500
        if (error instanceof ContentError || error instanceof TypeError) {
            status = 406
        }
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}