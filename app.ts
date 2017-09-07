import * as express from 'express'
import * as bp from 'body-parser'
import * as path from 'path'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
require('./server/config/mongoose')
import { schema } from './server/schema'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
var config = require('./webpack.dev.config')

const app = express(),
    DEFAULT_PORT = 3000,
    DIST_DIR = path.join(__dirname, 'dist'),
    HTML_FILE = path.join(DIST_DIR, 'index.html'),
    isDev = process.env.NODE_ENV !== 'production',
    compiler = webpack(config)


app.use('/graphql', bp.json(), graphqlExpress({
    schema
}))

app.use('/graphiql', bp.json(), graphiqlExpress({
    endpointURL: '/graphql'
}))

if (isDev) {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }))

    app.use(webpackHotMiddleware(compiler))

    app.get('/', (req, res, next) => {
        compiler.outputFileSystem.readFile(HTML_FILE, (err: Error, result: object) => {
            if (err) {
                return next(err)
            }
            res.set('content-type', 'text/html')
            res.send(result)
            res.end
        })
    })
} else {
    app.use(express.static(DIST_DIR))
    app.get('*', (req, res) => res.sendFile(HTML_FILE))
}

app.set('port', process.env.PORT || DEFAULT_PORT)

app.listen(app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'))
})