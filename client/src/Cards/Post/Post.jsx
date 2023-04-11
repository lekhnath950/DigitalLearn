import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import "./Post.css"
import axios from 'axios'
import moment from 'moment'

const Post = ({ post }) => {

    const [channel, setChannel] = React.useState({})

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/users/find/${post.userId}`)
            setChannel(res.data)
        }
        fetchChannel()
    }, [])
    return (
        <div>
{/* <Link to={`/posts/${post._id}`} > */}

            <div className='post'>
                <div className='container'>
                    {/* <div className='thumbnail'>
                        <img src={post.imgUrl} alt='thumbnail' className='thumbimg' />
                    </div> */}

                    <div>
                        <video width="320" height="240" controls>
                            <source src={post.videoUrl} type="video/mp4"/>
                        </video>
                    </div>

                    {/* <div className='userpp'>
                        <img src={channel.img} alt='pp' className='profilepic' />
                    </div> */}
                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.desc}</p>
                        <h5>{post.likes.length} Likes </h5>
                        <h5>{moment(post.createdAt).fromNow()} </h5>
                    </div>
                </div>
            </div>
            {/* </Link> */}
        </div>
    )
}

export default Post