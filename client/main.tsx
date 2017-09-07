import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

let a: typeof App = require('./App')

render(
    <App/>,
    document.getElementById('root')
)

interface RequireImport {
    default: any
}

if (module.hot) {
    module.hot.accept('./App', () => {
        console.log('doing a hot app accept')
        const NextApp = require<RequireImport>('./App').default
        render(
            <NextApp/>,
            document.getElementById('root')
        )
    })
}