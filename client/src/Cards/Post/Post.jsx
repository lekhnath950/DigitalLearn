import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Post.css"
import axios from 'axios'
import moment from 'moment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const Post = ({ post }) => {

    const [channel, setChannel] = React.useState({})

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
                <div className='abb'>
                    <div className='imggg'>
                    <Link to={`/posts/${post._id}`} >
                        <img src={post.imgUrl} alt="" height={200} />
                    </Link>
                    </div>

                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.desc}</p>
                    </div>

                    <div className='iii'>
                    <FavoriteBorderIcon />
                    <p>{post.likes.length}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post