import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,

    },

    img: {
        type: String,
    },

    subscribers: {
        type: Number,
        default: 0
    },

    subscribedUsers: {
        type: [String]
    },

    role: {
        type: String,
        enum: ['admin', 'owner', 'user'],
        default: 'user'
      },
},

    {
        timestamps: true,
    }

);

export default mongoose.model("User", UserSchema)