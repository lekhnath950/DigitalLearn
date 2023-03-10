import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    }
})