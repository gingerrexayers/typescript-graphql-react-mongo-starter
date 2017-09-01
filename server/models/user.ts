import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: String
})

mongoose.model('User', UserSchema)
