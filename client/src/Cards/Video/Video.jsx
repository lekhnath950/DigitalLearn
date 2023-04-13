import axios from 'axios'
import './video.css'
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { postRequest, postSuccess } from '../../redux/postSlice';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import LeftNav from '../../components/Navbar/LeftNav';

const Video = () => {

  const { user } = useSelector((state) => state.user)
  // const { currentPost } = useSelector((state) => state.postx)
  const currentPost = useSelector((state) => state.postx.currentPost);
  const dispatch = useDispatch()

  const path = useLocation().pathname.split("/")[2]
  // const [video,setVideo] = useState({})
  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      console.log("jj")
      dispatch(postRequest())
      console.log("jj1")
      try {
        const videoRes = await axios.get(`/posts/find/${path}`) //to get video from the postid
        console.log("jj2")
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)  //to get the channel data
        console.log("jj3")
        setChannel(channelRes.data)
        dispatch(postSuccess(videoRes.data))
      } catch (error) {

      }
    }
    fetchData()
  }, [])  

  return (
    <div>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <LeftNav />

        <div>
          <video width="400px" controls>
            <source src={currentPost && currentPost.videoUrl} type="video/mp4" />
          </video>

          <h3>
            {currentPost && currentPost.title}
          </h3>
          <h6>
            posted by:  {channel.name}
          </h6>
        </div>


      </div>
    </div>
  )
}

export default Video