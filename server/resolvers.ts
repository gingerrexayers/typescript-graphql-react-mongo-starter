import { getUsers, getUser } from './controllers/user'

const resolvers = {
    Query: {
        users: () => {
            return getUsers()
        },
        user: (root: any, { id } : { id: string }) => {
            console.log(typeof(root), typeof(id))
            return getUser(id)
        }
    }
}

export { resolvers }