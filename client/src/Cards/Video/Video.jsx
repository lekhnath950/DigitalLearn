import axios from 'axios'
import './video.css'
import { useLocation } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { postRequest, postSuccess } from '../../redux/postSlice';
import React, { useEffect, useState } from 'react'

const Video = () => { 

  const {user} = useSelector((state)=> state.user)
  const {currentPost} = useSelector((state)=> state.post)
  const dispatch = useDispatch()

  const path = useLocation().pathname.split("/")[3]
  console.log(path)
  // const [video,setVideo] = useState({})
  const [channel,setChannel] = useState({}) 

  useEffect(()=> {
    const fetchData = async () => {
      dispatch(postRequest())
      try {
        const videoRes = await axios.get(`/posts/find/${path}`)
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)
        // setVideo(videoRes.data)
        setChannel(channelRes.data)
        dispatch(postSuccess(videoRes.data))
      } catch (error) {
        
      }
    }
    fetchData()
  },[path,dispatch])
 
  return (
    <div>
        <div>
            <video controls>
            {/* <source src={post.videoUrl} type="video/mp4"/> */}

            </video>
            {/* {post.title}huyuy */}
            {user.name}
            jhhj
            {channel._id}
            {currentPost._id}
        </div>
    </div>
  )
}

export default Video