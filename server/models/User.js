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
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],

    discs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Disc'
    }],

    role: {
        type: String,
        enum: ['admin', 'instructer', 'user'],
        default: 'user'
      },
},

    {
        timestamps: true,
    }

);

export default mongoose.model("User", UserSchema)