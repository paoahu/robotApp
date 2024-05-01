

import { useState, useEffect } from 'react'
import { Button } from '../library/index'
import logic from '../logic'
import { useContext } from '../hooks'
import session from '../logic/session'

export default function Controller() {
    const context = useContext()
    const [userData, setUserData] = useState({ name: '', robot: '' })
    const [sequences, setSequences] = useState([])
    const [showSequences, setShowSequences] = useState(false)
    const [reloadSequences, setReloadSequences] = useState(false)
    const [editingSequenceId, setEditingSequenceId] = useState(null)

    useEffect(() => {
        logic.retrieveUserInfo()
            .then(user => {

                setUserData({ name: user.name, robot: user.robot })
            })
            .catch(error => {
                context.handleError(error)
            })
        logic.retrieveSequence()
            .then(sequences => {
                setSequences(sequences)
            })
            .catch(error => {
                context.handleError(error)
            })
    }, [reloadSequences])

    const toggleSequencesVisibility = () => setShowSequences(!showSequences)

    const handleAction = async (action) => {
        const userId = session.sessionUserId


        if (!userId) {
            console.error('No userId found')
            return
        }
        try {


            if (action === 'sayHi') {
                const messagePart1 = `Hola ${userData.name}`
                const messagePart2 = `Soy ${userData.robot}`
                await logic.ottoController(action, messagePart1, null, userId)

                setTimeout(async () => {

                    await logic.ottoController('clearLCD', '', null, userId)


                    setTimeout(async () => {
                        await logic.ottoController(action, messagePart2, null, userId)
                    }, 1000)
                }, 2000)

            } else if (action === 'endSequence') {



                await logic.ottoController(action, '', null, userId)



                setReloadSequences(prev => !prev)
            } else {

                await logic.ottoController(action, '', null, userId)

                setReloadSequences(prev => !prev)
            }
        } catch (error) {
            console.error(`Error executing ${action} action:`, error)
            context.handleError(error)
        }
    }



    function handlePlaySequence(sequenceId) {

        logic.ottoController('executeSequenceById', '', sequenceId)
            .then(response => {

            })
            .catch(error => {
                console.error('Error al ejecutar la secuencia:', error)
                context.handleError(error)
            })

    }

    function handleDeleteSequence(sequenceId) {

        logic.deleteSequence(sequenceId)
            .then(response => {

                setReloadSequences(prev => !prev)
            })
            .catch(error => {
                console.error('Error al ejecutar la secuencia:', error)
                context.handleError(error)
            })

    }



    function handleEditSequence(sequenceId) {

        if (editingSequenceId === sequenceId) {

            setEditingSequenceId(null)
        } else {

            setEditingSequenceId(sequenceId)

        }
    }

    function handleEditMovement(sequenceId, movementId, action) {
        logic.editSequence(sequenceId, movementId, action)
            .then(() => {

                setReloadSequences(prev => !prev)
            })
            .catch(error => {
                console.error('Error editing movement:', error)
                context.handleError(error)
            })
    }

    if (showSequences) {
        return (
            <div className="sequences-popup">
                <h3 className="h3-robotic-controller">Sequences</h3>
                {sequences.length > 0 ? sequences.map(sequence => (

                    <div key={sequence.id} className="mb-5 p-4 border border-gray-200 rounded-lg shadow">

                        <p className="created-at">Created at: {new Date(sequence.createdAt).toLocaleString()}</p>
                        <h5 className="h5-movements">Movements:</h5>
                        <ul>
                            <div className="movements-list">
                                {sequence.movements.map((movement, index) => (
                                    <li key={movement.id}>

                                        {`${movement.name}`}


                                        {editingSequenceId === sequence.id && (
                                            <>
                                                <div className="edit-movement">
                                                    <button className="button-deleteMovement" onClick={() => handleEditMovement(sequence.id, movement.id, 'delete')}>❌</button>
                                                    {index !== 0 && <button className="button-upMovement" onClick={() => handleEditMovement(sequence.id, movement.id, 'moveUp')}>⬆️</button>}
                                                    {index !== sequence.movements.length - 1 && <button className="button-downMovement" onClick={() => handleEditMovement(sequence.id, movement.id, 'moveDown')}>⬇️</button>}
                                                </div>
                                            </>
                                        )}
                                    </li>

                                ))}
                            </div>
                        </ul>
                        <div className="edit-buttons">
                            <button className="button-playSequence button" onClick={() => handlePlaySequence(sequence.id)}>Play</button>
                            <button className="button-deleteSequence button" onClick={() => handleDeleteSequence(sequence.id)}>Delete</button>
                            <button className="button-editSequence button" onClick={() => handleEditSequence(sequence.id)}>{editingSequenceId === sequence.id ? 'Finish Edit' : 'Edit'}</button>
                        </div>
                    </div>
                )) : <p>No sequences found.</p>}
                <button className="button-hideSequences" onClick={toggleSequencesVisibility}>Hide Sequences</button>
            </div>
        )
    }

    return (
        <div className="controller-container flex flex-col justify-between">
            <h1 className="h1-robotic-controller">Control your robot</h1>
            <div className="controller-wrapper">
                <h3 className="h3-robotic-controller">Direction</h3>

                <div className="controller-actions">
                    <button className="button-forward button" onClick={() => handleAction('walkForward')}></button>
                    <button className="button-stop button" onClick={() => handleAction('stop')}></button>
                    <button className="button-backward button" onClick={() => handleAction('walkBackward')}></button>
                    <button className="button-right button" onClick={() => handleAction('turnRight')}></button>
                    <button className="button-left button" onClick={() => handleAction('turnLeft')}></button>
                </div>
                <h3 className="h3-robotic-controller">Comunication</h3>
                <div className="comunication-buttons">
                    <button className="button-sayHi" onClick={() => handleAction('sayHi')}>Say Hi</button>
                    <button className="button-clearLCD" onClick={() => handleAction('clearLCD')}>Clear LCD</button>
                </div>
                <h3 className="h3-robotic-controller">Movements</h3>
                <div className="movement-buttons">
                    <button className="button-jump" onClick={() => handleAction('jump')}>Jump</button>
                    <button className="button-snakeMove" onClick={() => handleAction('snakeMove')}>Snake</button>
                    <button className="button-moonwalker" onClick={() => handleAction('moonwalker')}>Moonwalker</button>
                    <button className="button-crusaito" onClick={() => handleAction('crusaito')}>Crusaito</button>
                    <button className="button-swing" onClick={() => handleAction('swing')}>Swing</button>
                    <button className="button-upDown" onClick={() => handleAction('upDown')}>upDown</button>
                    <button className="button-kickLeft" onClick={() => handleAction('kickLeft')}>kickLeft</button>
                    <button className="button-noGravity" onClick={() => handleAction('noGravity')}>noGravity</button>
                    <button className="button-shakeLegRight" onClick={() => handleAction('shakeLegRight')}>Shake Leg Right</button>
                    <button className="button-shakeLegLeft" onClick={() => handleAction('shakeLegLeft')}>Shake Leg Left</button>
                    <button className="button-endSequence" onClick={() => handleAction('endSequence')}>End Sequence</button>



                    <button className="button-showSequence" onClick={toggleSequencesVisibility}>Show Sequences</button>
                </div>
                <div className="finalDance">
                    <button className="button-finalDance" onClick={() => handleAction('finalDance')}></button>
                </div>
            </div>
        </div>
    )
}
