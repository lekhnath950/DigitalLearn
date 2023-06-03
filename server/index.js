import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import authRoute from './routes/authRoute.js'
import reviewRoute from './routes/reviewRoute.js'
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then (()=> {
        console.log("connected to Mongodb")
    })
}

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=> {
res.json("Welcome to DigitalLearn")
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/review", reviewRoute)

app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(2000,()=> {
    connect()
    console.log("connected")
})
