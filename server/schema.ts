import {
    makeExecutableSchema,
    addMockFunctionsToSchema
} from 'graphql-tools'

import { resolvers } from './resolvers'

/*viewer(token: String) {
    name
}*/
const typeDefs = `
type User {
    id: ID!
    email: String!
}

type Query {
    users: [User]
    user(id: ID!): User
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })
export { schema }