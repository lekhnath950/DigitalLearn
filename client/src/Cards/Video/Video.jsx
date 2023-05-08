import axios from 'axios'
import './video.css'
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { postRequest, postSuccess } from '../../redux/postSlice';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import LeftNav from '../../components/Navbar/LeftNav';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';


const Video = () => {

  const { user } = useSelector((state) => state.user)
  const { currentPost } = useSelector((state) => state.postx)
  const dispatch = useDispatch()

  const path = useLocation().pathname.split("/")[2]
  const [channel, setChannel] = useState({})

  const [open, setOpen] = useState(false)

  const OpenVideo = () => {
    setOpen(true)
  }

  const closee = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch(postRequest())
      try {
        const videoRes = await axios.get(`/posts/find/${path}`) //to get video from the postid
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)  //to get the channel data
        setChannel(channelRes.data)
        dispatch(postSuccess(videoRes.data))
      } catch (error) {

      }
    }
    fetchData()
  }, [path, dispatch])

  const [likee, setLikee] = useState(0)
  const [liked,setLiked] = useState(false)

  const likeHandle = async () => {
    await axios.put(`/users/love/${currentPost._id}`)

    if(!liked) {
      setLiked(true)
      setLikee(likee + 1)
    } else {
      setLiked(false)
      setLikee(likee -1)
    }
  }



  return (
    <div>
      <Navbar />

      <div className='videoPage'>
        <div className='navbar-video'>
          <LeftNav />
        </div>

        <div className='video-feed' >

        <div onClick={OpenVideo}>
          <img src={currentPost && currentPost.imgUrl} width={400} />
        </div>


        <div className=''>

          <h3>
            {currentPost && currentPost.title}
          </h3>
          <p>{currentPost && currentPost.desc}</p>
          <p>{currentPost && currentPost.likes.length + likee}</p>
          <span><button onClick={likeHandle}> {liked? "unlike" :"like"} </button></span>
          <h6>
            posted by:  {channel.name}
          </h6>
        </div>

        </div>


      </div>

      <Dialog open={open} onClose={closee}>
        <DialogActions>
          <Button onClick={closee} variant='outlined'>close</Button>
        </DialogActions>
        <DialogContent>
          <video width="500px" controls>
            <source src={currentPost && currentPost.videoUrl} type="video/mp4" />

          </video>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Video