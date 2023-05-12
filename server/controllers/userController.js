import { createError } from "../error.js"
import Post from "../models/Post.js"
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

export const updateByAdmin = async (req,res,next) => {
    try {

        const user = await User.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },
            {new: true})

        res.status(200).json(user);
    } catch (error) {
        next(error)
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
        const user = await User.findById(req.params.id)
        res.status(200).json(user);

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

// export const like = async (req,res, next) => {
//     const id = req.user.id
//     const postId = req.params.postId
//     try {
//         await Post.findByIdAndUpdate(postId,{
//             $addToSet:{likes:id},
//             $pull:{dislikes:id}
//         })

//         res.status(200).json("Post Liked")

//     } catch (err) {
//         next(err)
//     }
// }


export const love = async (req,res,next) => {
    try {
        const post = await Post.findById(req.params.postId)
        if(!post){
            return res.status(404).json("Post not found")
        }

        if(post.likes.includes(req.user.id)){
            const index = post.likes.indexOf(req.user.id);
            post.likes.splice(index,1)
            await post.save();
            return res.status(200).json("Post unliked")
        } else {
            post.likes.push(req.user.id);
            await post.save();
            return res.status(200).json("Post liked")
        }

    } catch (error) {
        next(error)
    }
}

export const userLikes = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const posts = await Post.find({ likes: userId });
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }


export const allUser = async(req,res,next) => {
    try {
        const users = await User.find()
        // console.log(users)
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}