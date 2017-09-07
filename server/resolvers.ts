import { getUsers, getUser } from './controllers/user'

const resolvers = {
    Query: {
        users: () => {
            return getUsers()
        },
        user: (root: any, { id } : { id: string }) => {
            return getUser(id)
        }
    }
}

export { resolvers }