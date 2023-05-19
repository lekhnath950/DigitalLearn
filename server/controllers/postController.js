import { createError } from "../error.js"
import Post from "../models/Post.js"
import User from "../models/User.js"
import mongoose from "mongoose"

export const test = (req,res) => {
    res.json("Hi there")
}

export const addPost = async (req, res, next) => {
    const newVideo = new Post({ userId: req.user.id, ...req.body });
    try {
      const savedVideo = await newVideo.save();
      res.status(200).json(savedVideo);
    } catch (err) {
      next(err);
    }
  };

export const updatePost = async (req,res,next) => {
    try {
        const video = await Post.findById(req.params.id)
        if(!video) return next(createError(404,"Post not found"))
        if(req.user.id === video.userId) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
            {new: true}
            );
            res.status(200).json(updatedPost);
        }
    } catch (err) {
        next(err)
    }
}

export const deletePost = async (req,res,next) => {
    try {
        const video = await Post.findById(req.params.id)
        if(!video) return next(createError(404,"Post not found"))
        if(req.user.id === video.userId) {
             await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("The post has been deleted");
        }
        
    } catch (err) {
        next(err)
    }
}


export const getPost = async (req,res,next) => {
    try {
       const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        next(err)
    }
} 

export const getProfilePost = async (req,res,next) => {
    try {
    //    const post1 = await Post.findById(req.params.id)
        const post = await Post.find({ userId: req.params.id });
        // console.log(post1)
        res.status(200).json(post)

        
    } catch (err) {
        next(err)
    }
} 



export const addView = async (req,res,next) => {
    try {

        await Post.findByIdAndUpdate(req.params.id, {
            $inc:{views:1}
        })
        res.status(200).json("The view has been increased")
        
    } catch (err) {
        next(err)
    }
}
export const random = async (req,res,next) => {
    try {

        const post = await Post.aggregate([{$sample: {size: 6}}])
        res.status(200).json(post)
        
    } catch (err) {
        next(err)
    }
}
export const trend = async (req,res,next) => {
    try {

        const post = await Post.find().sort({likes:-1})
        res.status(200).json(post)
        
    } catch (err) {
        next(err)
    }
}
export const sub = async (req,res,next) => {
    try {

        const user = await User.findById(req.user.id)
        const subchannel = user.subscribedUsers;

        const list = await Promise.all(
        subchannel.map( async (channelId)=> {
            return await Post.find({userId: channelId})
        }))

        res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt))
        
    } catch (err) {
        next(err)
    }
}


export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(',');
    try {
      const post = await Post.find({ tags: { $all: tags.map((tag) => new RegExp(tag, 'i')) } }).limit(2);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  };
  

export const getTags = async (req, res, next) => {
    try {
      const tags = await Post.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: { $toLower: '$tags' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);
      res.status(200).json(tags);
    } catch (err) {
      next(err);
    }
  };

  export const getTagsPost = async (req, res, next) => {
    try {
      const post = req.params.id;
      console.log(post)
  
      const tags = await Post.aggregate([
        { $match: { _id:  mongoose.Types.ObjectId(post) } }, // Filter posts based on post ID
        { $unwind: "$tags" },
        {
            $group: {
              _id: post,
              tags: { $addToSet: "$tags" },
              count: { $sum: 1 }
            }
          },
        { $sort: { count: -1 } },
      ]);
      console.log("hi")
      res.status(200).json(tags);
    } catch (err) {
      next(err);
    }
  };  

export const search = async (req,res,next) => {
    const query = req.query.q
    try {

        const post = await Post.find(
            { $or: [
                { title: { $regex: query, $options: "i" } },
                { desc: { $regex: query, $options: "i" } }
            ] }
            ).limit(5).sort({views:-1})
        res.status(200).json(post)
        
    } catch (err) {
        next(err)
    }
}