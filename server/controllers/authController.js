import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../error.js"

export const signup = async (req,res,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({...req.body, password: hash})
        console.log(req.body)

        await newUser.save();
        res.status(200).send("User Created")
    } catch (err) {
        // next(createError(404, "not found sorry"))
        next(err)
    }
}

export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({email:req.body.email})

        if(!user) return res.status(400).json({
            success: false,
            message: "User does not exist",
          });

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            }); 
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRETKEY );
        const {password, ...others} = user._doc
        res.cookie("access_token", token,
        {
            expires: new Date(Date.now()+ 90* 24* 60* 60* 1000),
            httpOnly: true
        }).status(200).json(others)
    } catch (err) {
        next(err)
    }
}