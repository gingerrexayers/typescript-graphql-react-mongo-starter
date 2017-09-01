import * as express from 'express'
import * as bp from 'body-parser'
import {
    graphqlExpress,
    graphiqlExpress
} from 'apollo-server-express'
require('./server/config/mongoose')
import { schema } from './server/schema'

const app = express()
const DEFAULT_PORT = 3000

app.use('/graphql', bp.json(), graphqlExpress({
    schema
}))

app.use('/graphiql', bp.json(), graphiqlExpress({
    endpointURL: '/graphql'
}))

app.set('port', process.env.PORT || DEFAULT_PORT)

app.listen(app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'))
})