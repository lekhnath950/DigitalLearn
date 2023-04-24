import axios from 'axios'
import './video.css'
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { postRequest, postSuccess } from '../../redux/postSlice';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import LeftNav from '../../components/Navbar/LeftNav';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

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
  }, [path, dispatch])

  return (
    <div>
      <Navbar />

      <div className='videoPage'>
        <div className='navbar-video'>
          <LeftNav />
        </div>

<<<<<<< HEAD
        <div className='video-feed' >

        <div onClick={OpenVideo}>
          <img src={currentPost.imgUrl} width={400} />
=======

        <div className='video-feed' >


        <div onClick={OpenVideo}>
          <img src={ currentPost && currentPost.imgUrl} width={400} />
>>>>>>> refs/remotes/origin/main
        </div>


        <div className=''>

          <h3>
            {currentPost && currentPost.title}
          </h3>
<<<<<<< HEAD
          <p>{currentPost.desc}</p>
=======
          <p>{currentPost && currentPost.desc}</p>
>>>>>>> refs/remotes/origin/main
          <h6>
            posted by:  {channel.name}
          </h6>
        </div>

        </div>


      </div>

      <Dialog open={open} onClose={closee}>
<<<<<<< HEAD
=======

>>>>>>> refs/remotes/origin/main
        <DialogActions>
          <Button onClick={closee} variant='outlined'>close</Button>
        </DialogActions>
        <DialogContent>
          <video width="500px" controls>
<<<<<<< HEAD
=======

>>>>>>> refs/remotes/origin/main
            <source src={currentPost && currentPost.videoUrl} type="video/mp4" />
          </video>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Video