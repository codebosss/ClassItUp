import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    joinedOn: { type: Date, default: Date.now() },
    role: { type: String, default: 'student' },
})

const User = mongoose.model('User', userSchema)

export default User