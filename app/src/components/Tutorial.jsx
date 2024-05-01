import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Field, Link, Container } from '../library'
import logic from '../logic'

import { Editor } from '@tinymce/tinymce-react'

import { Input } from '../library'
import session from '../logic/session'

import { useContext } from '../hooks'

const apiKey = import.meta.env.VITE_API_KEY



function Tutorial(props) {

    const [editTextTutorial, setEditTextTutorial] = useState(null)
    const [title, setTitle] = useState(props.tutorial.title)
    const [text, setText] = useState(props.tutorial.text)

    const editorRef = useRef(null)


    const context = useContext()
    const navigate = useNavigate()
    const tutorial = props.tutorial



    function handleToggleLikePostClick() {
        try {
            logic.toggleLikeTutorial(tutorial.id)
                .then(() => {
                    props.onToggleLikeClick()

                })
                .catch(error => context.handleError(error))

        } catch (error) {

            context.handleError(error)
        }
    }


    function handleEditSubmit(event) {
        event.preventDefault()
        const newTitle = title
        const newText = editorRef.current.getContent()
        setText(newText)
        try {
            logic.editTutorial(props.tutorial.id, { title: newTitle, text: newText })
                .then(() => {
                    setEditTextTutorial(false)
                    props.onUpdate()
                })
                .catch(error => context.handleError(error))
        } catch (error) {
            context.handleError(error)
        }
    }


    function handleEditClick() {
        if (editTextTutorial === null) {
            setEditTextTutorial('edit-text-tutorial')
        } else {
            setEditTextTutorial(null)
        }
    }
    function handleCancelEdit() {
        setEditTextTutorial(null)
    }
    function handleToggleDeleteTutorialClick() {
        if (confirm('Are you sure you want to delete this tutorial?')) {
            try {
                logic.deleteTutorial(tutorial.id)
                    .then(() => {
                        props.onToggleDeleteClick()
                    })
                    .catch(error => context.handleError(error))
            } catch (error) {

                context.handleError(error)
            }
        }
    }
    const handleUserClick = event => {
        event.preventDefault()

    }


    return (
        <div className="tutorial-wrapper">
            <article className="tutorial">
                <strong><p>{props.tutorial.author.name}</p></strong>
                <strong><p>{props.tutorial.author.role}</p></strong>

                {editTextTutorial ? (
                    <Form onSubmit={handleEditSubmit}>
                        <Field id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} label="Title" />
                        <Editor

                            apiKey={apiKey}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={text}
                            init={{
                                height: 200,

                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help'
                            }}
                        />
                        <div className="tutorial-edition">
                            <button className="button-saveTutorial" type="submit">Save</button>
                            <button className="button-cancelTutorial" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    </Form>
                ) : (
                    <>
                        <strong><p>{title}</p></strong>
                        <p dangerouslySetInnerHTML={{ __html: text }}></p>
                    </>
                )}

                <div className="tutorial-actions">

                    <button className="button-likeTutorial" onClick={handleToggleLikePostClick}>
                        {props.tutorial.liked ?
                            (<img src="ottoLikePeq2.png" alt="Liked" />) :
                            (<img src="ottoDislike2.png" alt="Not Liked" />)
                        }

                    </button>
                    {context.userRole === 'admin' && (
                        <>
                            <button className="button-deleteTutorial" onClick={handleToggleDeleteTutorialClick}>
                                <img src="papelera2.png" alt="Delete" />
                            </button>
                            <button className="button-editTutorial" onClick={handleEditClick}>
                                {editTextTutorial ? 'Cancel Edit' : <img src="ottoEdit.png" alt="Edit" />}
                            </button>
                        </>
                    )}
                </div>
            </article>
        </div>
    )





}
export default Tutorial