import Review from "../models/reviewModel.js"
import Post from "../models/Post.js"
import { createError } from "../error.js"
import Discussion from "../models/Discussion.js"

export const addReview = async (req,res,next) => {
    const newReview = new Review({...req.body, userId: req.user.id})
    try {
        const savedReview = await newReview.save()
        res.status(200).send(savedReview)
    } catch (err) {
        next(err)
    }
}

export const deleteReview = async (req,res,next) => {
    try {
        const review = await Review.findById(req.params.id)
        const post = await Post.findById(req.params.id)
        if(req.user.id == review.userId || req.user.id === post.userId) {
            await Review.findByIdAndDelete(req.params.id)
            res.status(200).json(" Deleted")
        } else {
            return next(createError(403, "Can't delete"))
        }
        
    } catch (err) {
        next(err)
    }
}

export const getReview = async (req,res,next) => {
    try {

        const review = await Review.find({videoId: req.params.videoId})
        res.status(200).json(review)
        
    } catch (err) {
        next(err)
    }
}


export const createDisc = async (req,res,next) => {
    const newDisc = new Discussion({userId: req.user.id, ...req.body})
    try {
        const saveDisc = await newDisc.save()
        res.status(200).json(saveDisc)    
    } catch (error) {
        next(error)
    }
}

export const getDisc = async (req,res,next) => {
    try {
        const dis = await Discussion.find();
        res.status(200).json(dis)
    } catch (error) {
        next(error)
    }
} 

export const getUserDisc = async (req,res,next) => {
    try {
        const dis = await Discussion.findById(req.params.id)
        res.status(200).json(dis)
        console.log(dis)
    } catch (error) {
        next(error)
    }
}


export const addReply = async (req,res,next) => {
    try {
        const dis = await Discussion.findById(req.params.id)
        dis.reply.push({
            userId: req.user.id,
            ...req.body
        })

        const saved = await dis.save()
        res.status(200).json(saved)
    } catch (error) {
        next(error)
    }
}

