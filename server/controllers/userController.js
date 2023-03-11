import { createError } from "../error.js"
import Post from "../models/Post.js"
// import userModel from "../models/userModel"
// import {User} from "../models/userModel"
import User from "../models/User.js"

export const test = (req,res) => {
    res.json("Hi there")
}

export const update = async (req,res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
            { new: true }
            )
            res.status(200).json(updatedUser)
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You cannot update others data"))
    }
}


export const deleteUser = async (req,res, next) => {
    if(req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You cannot delete others data"))
    }
}

export const getUser = async (req, res,next) => {
    try {
        const user = await User.findById(req.params)
    } catch (err) {
        next(err)
    }
}
export const subscribe =async (req,res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: {subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers:2},
        });
        res.status(200).json("Subscription successfull")

    } catch (err) {
        next(err)
    }
}

export const unsubscribe = async (req,res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1},
        });
        res.status(200).json("unSubscription successfull")

    } catch (err) {
        next(err)
    }
}

export const like = async (req,res, next) => {
    const id = req.user.id
    const postId = req.params.postId
    try {
        await Post.findByIdAndUpdate(postId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })

        res.status(200).json("Post Liked")

    } catch (err) {
        next(err)
    }
}

export const dislike = async (req,res, next) => {
    const id = req.user.id
    const postId = req.params.postId
    try {
        await Post.findByIdAndUpdate(postId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })

        res.status(200).json("Post disLiked")
        
    } catch (err) {
        next(err)
    }
}
