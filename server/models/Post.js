import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        required: true,

    },

    imgUrl: {
        type: String,
        required:true,
    }, 

    videoUrl: {
        type: String,
        required: true,
    },

    views: {
        type: Number,
        default: 0
    },

    tags: {
        type: [String],
        default: [],
        set: (tags) => tags.map((tag) => typeof tag === 'string' ? tag.toLowerCase() : tag)
      },
      
    likes: {
        type: [String],
        default: []
    },
},

    {
        timestamps: true,
    }

);

export default mongoose.model("Post", postSchema)