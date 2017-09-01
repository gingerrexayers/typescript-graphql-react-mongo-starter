import { getUsers } from './controllers/user'

const resolvers = {
    Query: {
        users: () => {
            console.log(getUsers())
            return getUsers()
        },
/*        user: (root: any, { id } : { id: string }) => {
            console.log(typeof(root), typeof(id))
            return users.find(user => user.id === id)
        }
*/
    }
}

export { resolvers }