import axios from 'axios'
import './video.css'
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { postRequest, postSuccess } from '../../redux/postSlice';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import LeftNav from '../../components/Navbar/LeftNav';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import moment from 'moment';
import Loader from '../Loader/Loader';


const Video = () => {

  const { user} = useSelector((state) => state.user)
  const { currentPost, loading } = useSelector((state) => state.postx)
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
        const channelRes = await axios.get(`/users/finds/${videoRes.data.userId}`)  //to get the channel data
        setChannel(channelRes.data)
        dispatch(postSuccess(videoRes.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [path, dispatch])

  const [liked,setLiked] = useState(false)

  const likeHandle = async () => {
    await axios.put(`/users/love/${currentPost._id}`)
  }

  useEffect(() => {
    if (user) {
      currentPost.likes.forEach((item) => {
        if (item === user._id) {
          setLiked(true);
        }
      });
    }
  }, [currentPost.likes, user]);


  return (
    <div>
      <Navbar />

      <div className='videoPage'>
        <div className='navbar-video'>
          <LeftNav />
        </div>

{
  loading && (
      <Loader/>

  )
}


{ currentPost && (
        <div className='video-feed' >

        <div onClick={OpenVideo}>
          <img src={currentPost.imgUrl} width={400} alt="post"/>
        </div>


        <div className=''>

          <h3>
            {currentPost.title} 
          </h3>
          <p>{currentPost.desc}</p>
          <p>{currentPost.likes.length }</p> 
           {/* <pre>{currentPost > 0 && currentPost.likes }</pre> */}
           {moment(currentPost.createdAt).fromNow()}
           
          <span><button onClick={likeHandle}> {liked? "unlike" :"like"} </button></span>
          <h6>
            posted by:  {channel.name}
          </h6>
        </div>

        </div>
)}

      </div>

{  
currentPost && (
<Dialog open={open} onClose={closee}>
        <DialogActions>
          <Button onClick={closee} variant='outlined'>close</Button>
        </DialogActions>
        <DialogContent>
          <video width="500px" controls>
            <source src={currentPost.videoUrl} type="video/mp4" />

          </video>

        </DialogContent>
      </Dialog>
      
      )  }
    </div>
  )
}

export default Video