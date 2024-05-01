window.console2 = {
    log(message, type = 'debug') {
        let color = 'yellowgreen'
        let back = 'transparent'

        if (type === 'info')
            color = 'dodgerblue'

        else if (type === 'warn')
            color = 'gold'

        else if (type === 'error')
            color = 'tomato'

        else if (type === 'fatal') {
            color = 'white'
            back = 'tomato'
        }



    }
}