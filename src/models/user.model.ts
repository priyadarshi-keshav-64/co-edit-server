import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    userId: String,
    name: String,
    email: String,
    firstName: String,
    lastName: String,
    image: String,
    lastSignedInAt: Date
}, {
    timestamps: true
})

const User = model('user', UserSchema);

export default User;