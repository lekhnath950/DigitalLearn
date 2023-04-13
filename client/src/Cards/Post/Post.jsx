import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Post.css"
import axios from 'axios'
import moment from 'moment'
import { Dialog, DialogContent } from '@mui/material'

const Post = ({ post }) => {

    const [channel, setChannel] = React.useState({})
    const [open, setOpen] = useState(false)

    const clickMe = () => {
        setOpen(true)
    }

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/posts/find/${post.userId}`)
            setChannel(res.data)
        }
        fetchChannel()
    }, [post.userId])


    return (
        <div>


            <div className='post'>
                <div className='container'>
                    <p onClick={clickMe}>Click to play Video</p>
                    <Link to={`/posts/${post._id}`} >
                        <div className='thumbnail'>
                            <img src={post.imgUrl} alt='thumbnail' className='thumbimg' />
                        </div>
                        <Dialog open={open}>
                            <DialogContent>
                                <video controls width={400}>
                                    <source src={post.videoUrl} />
                                </video>
                            </DialogContent>
                        </Dialog>

                    </Link>
                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.desc}</p>
                        {/* <h5>{post.likes.length} Likes </h5> */}
                        <h5>{moment(post.createdAt).fromNow()} </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post