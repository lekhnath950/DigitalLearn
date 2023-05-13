import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Post.css"
import axios from 'axios'
import moment from 'moment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const Post = ({ post }) => {

    const [channel, setChannel] = useState({})

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/posts/find/${post._id}`)
            setChannel(res.data)
        }
        fetchChannel() 
    }, [post._id])


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
                        <h3>{post.title} <span style={{fontSize:10}}> [{moment(post.createdAt).fromNow()}] </span></h3>
                        <p>{post.desc}</p>
                    </div>

                    <div className='iii'>
                    <FavoriteBorderIcon />
                    <p>{post.likes.length}</p>
                    <p>{channel.__v}</p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post