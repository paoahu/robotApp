import React from 'react'
import { Button, Container } from '../library'
import classnames from 'classnames'


const Feedback = props => {

    let modifier = 'Feedback--debug'

    switch (props.level) {
        case 'info':
            modifier = 'Feedback--info'
            break
        case 'warn':
            modifier = 'Feedback--warn'
            break
        case 'error':
            modifier = 'Feedback--error'
            break
        case 'fatal':
            modifier = 'Feedback--fatal'
            break
    }



    return <Container className={classnames(`container--horizontal Feedback Feedback-- ${modifier}`)}>
        <p>{props.message}</p>
        <Button onClick={props.onAccepted} >Accept</Button>
    </Container>
}

export default Feedback