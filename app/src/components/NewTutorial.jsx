import { Button, Container, Field, Form } from "../library"
import logic from "../logic"


import { useContext } from '../hooks'

export default function ({ onPublish, onCancel }) {


    const context = useContext()



    const handleSubmit = event => {
        event.preventDefault()

        const title = event.target.querySelector('#title-input').value

        const text = event.target.querySelector('#text-input').value

        try {
            logic.publishTutorial(title, text)
                .then(() => onPublish())
                .catch(error => context.handleError(error))


        } catch (error) {
            context.handleError(error)
        }
    }

    const handleCancel = event => {
        event.preventDefault()

        onCancel()
    }



    return (
        <div className="container-new-post">
            <div className="new-tutorial-container">
                <h2 className="h2-robotic-new-tutorial">New Tutorial</h2>

                <Form onSubmit={handleSubmit}>
                    <Field id="title-input" type="text">Title</Field>
                    <Field id="text-input" type="text">Text</Field>

                    <button className="button-playSequence button" type="submit" >Publish</button>
                    <button className="button-playSequence button" onClick={handleCancel}>Cancel</button>
                </Form>
            </div>
        </div>
    )
}