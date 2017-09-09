import * as React from 'react'
import { StatelessComponent } from 'react'
import { User } from '../../interfaces/User'

import {
    gql,
    graphql,
    ChildProps
} from 'react-apollo'

interface Response {
    users: [User]
}

interface InputProps {

}

const userListQuery = gql`
query {
    users {
        id
        email
    }
}
`

export const withData = graphql<Response, InputProps>(userListQuery, {
    options: { pollInterval: 5000 }
})

class UserListComponent extends React.Component<ChildProps<InputProps, Response>, {}> {
    render() {
        const { loading, users, error } = this.props.data
        if (loading) {
            return <p>Loading</p>
        }
        if (error) {
            return <p>{error.message}</p>
        }
        console.log(this.props.data)
        
        return (
            <div>
                {
                    users.map( (u: User) => (
                        <div key={u.id}>{u.email}</div>
                    ))
                }
            </div>
        )
    }
}

export const UserList = withData(UserListComponent)