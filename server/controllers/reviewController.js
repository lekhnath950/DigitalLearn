import Review from "../models/reviewModel.js"
import Post from "../models/Post.js"
import { createError } from "../error.js"
import Discussion from "../models/Discussion.js"
import User from "../models/User.js"

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

        const user = await User.findById(req.user.id);
        user.discs.push(saveDisc._id);
        await user.save();

        res.status(200).json(saveDisc)    
    } catch (error) {
        next(error)
    }
}

export const getDisc = async (req,res,next) => {
    try {
        const dis = await Discussion.find().sort({ createdAt: 'desc' }).populate("userId reply.userId");
        res.status(200).json(dis)
    } catch (error) {
        next(error)
    }
} 

export const discSearch = async (req, res, next) => {
    try {
        const { search } = req.query;

        const disc = await Discussion.find({
            $or: [
                { topic: { $regex: search, $options: 'i' } },
                { 'reply.rep': { $regex: search, $options: 'i' } },
            ]
        }).populate('userId reply.userId')
        res.status(200).json(disc)
    } catch (error) {
        next(error)
    }
}


export const getDiscLimit = async (req, res, next) => {
    const { page = 1, limit = 12 } = req.query; // Set default page to 1 and limit to 5 discussions per page
  
    try {
      const count = await Discussion.countDocuments(); // Get total count of discussions in the database
      const dis = await Discussion.find().sort({ createdAt: 'desc' })
        .populate("userId reply.userId")
        .limit(limit) // Limit the number of discussions to the specified limit
        .skip((page - 1) * limit) // Skip the discussions that have already been loaded
        .sort({ createdAt: 'desc' })
      res.status(200).json({
        totalPages: Math.ceil(count / limit), // Calculate the total number of pages
        currentPage: page, // Set the current page
        discussions: dis, // Set the discussions for the current page
      });
    } catch (error) {
      next(error);
    }
  };
  

export const getUserDisc = async (req,res,next) => {
    try {
        const dis = await Discussion.findById(req.params.id)
        const user = dis.userId
        const userDetail = await User.findById(user)
        res.status(200).json(dis)
        console.log(userDetail)
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


export const deleteDisc = async (req,res,next) => {
    try {
        const disc = await Discussion.findById(req.params.id)
        if(!disc) return next(createError(404,"Discussion not found!"))
        const user = await User.findById(req.user.id);
        if(req.user.id === disc.userId || user.role === 'admin') {
            await Discussion.findByIdAndDelete(req.params.id)

            // const user = await User.findById(req.user.id);
            user.discs.pull(req.params.id);
            await user.save();
            res.status(200).json("Deleted")
        } else {
            return next(createError(404,"Unauthorized"))
        }
    } catch (error) {
        next(error)
    }
}

// export const deleteRep = async (req,res,next) => {
//     try {
//         const discussion = await Discussion.findByIdAndUpdate(req.params.id, 
//             {
//                 $pull: {reply: {_id: req.params.id}}
//             }, {new: true})
//         // const abc = await discussion.findByIdAndDelete(req.params.id)
//         res.status(200).json(discussion)
//     } catch (error) {
//         next(error)
//     }
// }


export const deleteRep = async (req,res,next) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(
            req.params.id,
            { $pull: { reply: { _id: req.params.replyId } } },
            { new: true }
        );
        res.status(200).json("Deleted");
    } catch (error) {
        next(error);
    }
}


// export const deleteRep = async (req,res,next) => {
//     try {
//         const discussion = await Discussion.findById(req.params.id);
//         if (!discussion) {
//             return res.status(404).json({ error: 'Discussion not found' });
//         }
//         const replyIndex = discussion.reply.findIndex(reply => reply._id == req.params.replyId);
//         if (replyIndex === -1) {
//             return res.status(404).json({ error: 'Reply not found' });
//         }
//         discussion.reply.splice(replyIndex, 1);
//         await discussion.save();
//         res.status(200).json(discussion);
//     } catch (error) {
//         next(error);
//     }
// }

