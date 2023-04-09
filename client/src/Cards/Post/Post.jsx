import React, { useEffect } from 'react'
// import {Link} from "react-router-dom"
import "./Post.css"
import axios from 'axios'

const Post = ({post}) => {

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

            {/* <Link to={`/post/${post._id}`}> */}
            {/* <Link to={``}> */}
        <div className='post'>
                <div className='container'>
                    <div className='thumbnail'>
                        <img src={post.imgUrl} alt='thumbnail' className='thumbimg' />
                    </div>

                    <div className='userpp'>
                        <img src={channel.img} alt='pp' className='profilepic' />
                    </div>
                    <div>
                        <h3>{post.title}</h3>
                        <h5>{post.desc}</h5>
                        <h5>{post.likes.length} </h5>
                        <h5>{post.createdAt} </h5>
                    </div>
                </div>
        </div>
            {/* </Link> */}
    </div>
  )
}

export default Post