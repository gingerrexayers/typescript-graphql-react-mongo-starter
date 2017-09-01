import * as mongoose from 'mongoose'
import * as fs from 'fs'
import * as path from 'path'

mongoose.connect('mongodb://localhost/blockr')

const modelsPath = path.join(__dirname, './../models')
fs.readdirSync(modelsPath).forEach((file) => {
    if (file.indexOf('.ts') >= 0) {
        require(path.join(modelsPath, file))
    }
})
