import mongoose from "mongoose"

const discussionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref:'User'
    },

    topic: {
        type: String,
        required: true
    },

    reply: [
        {
            userId: {
                type: String,
                required: true,
                ref:'User'
            },
            rep: {
                type: String,
                required: true
            },
            time: {
                default: Date.now,
                type: Date
            }
        }
    ]

},
    {
        timestamps: true,
    }

);

export default mongoose.model("Disc",discussionSchema)