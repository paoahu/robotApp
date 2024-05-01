import { useEffect, useState } from 'react'
import Tutorial from '../components/Tutorial'
import NewTutorial from '../components/NewTutorial'
import { Button, Form, Link, Field } from '../library'

import { useContext } from '../hooks'

function Tutorials(props) {

    const context = useContext()
    const { userRole } = context

    const [view, setView] = useState(null)
    const [tutorials, setTutorials] = useState([])



    const refreshTutorials = () => {
        try {
            props.loadTutorials()
                .then(tutorials => {

                    tutorials.reverse()

                    setTutorials(tutorials)

                })

                .catch(error => context.handleError(error))



        } catch (error) {

            context.handleError(error)
        }
    }

    useEffect(() => {


        refreshTutorials()
    }, [props.stamp])

    function handleNewTutorialClick() {
        setView('new-tutorial')
    }

    function handleNewTutorialPublish() {
        setView(null)

        window.scrollTo(0, 0)
        refreshTutorials()
    }

    function handleNewTutorialCancel() {
        setView(null)
    }








    return (
        <div className="tutorials">
            <div className="tutorials-wrapper">
                <h3 className="h3-robotic-tutorials">Tutorials</h3>
                {tutorials.map(tutorial => (
                    <Tutorial
                        key={tutorial.id}
                        tutorial={tutorial}
                        onToggleLikeClick={refreshTutorials}
                        onToggleDeleteClick={refreshTutorials}
                        onUpdate={refreshTutorials}
                    />
                ))}
            </div>

            {userRole === 'admin' && (
                <footer className="footer">
                    {view === 'new-tutorial' && (
                        <NewTutorial
                            onPublish={handleNewTutorialPublish}
                            onCancel={handleNewTutorialCancel}
                            onError={context.handleError}
                        />
                    )}
                    {view !== 'new-tutorial' && (
                        <button className="button-addTutorial button" onClick={handleNewTutorialClick}>+</button>
                    )}
                </footer>
            )}
        </div>
    )


}
export default Tutorials