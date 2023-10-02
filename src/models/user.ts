import { connectToDB } from '@/lib/database';
import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'user aleready exists'],
        required: [true, 'email is required'],
    },
    name: {
        type: String,
        required: [true, 'username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    },
    albums: [
        {
            name: String,
            images: [String]
        },
    ],
    favourites: {
        type: [String],
        default: []
    }
})

export const getUserModel = async () => {
    await connectToDB();
    const User = models.User || model('User', UserSchema);
    return User
}
export default getUserModel

