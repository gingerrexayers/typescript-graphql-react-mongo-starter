import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { UserList } from './components/UserList/UserList'
import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo'

const networkInterface = createNetworkInterface({ uri: '/graphql' })

const client = new ApolloClient({
    networkInterface: networkInterface
})

class App extends React.Component<{}, {}> {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <UserList/>
                </BrowserRouter>
            </ApolloProvider>
        )
    }
}

export default App