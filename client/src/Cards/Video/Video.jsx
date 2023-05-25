import axios from 'axios'
import './video.css'
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { likeFailure, likeRequest, likeSuccess, postRequest, postSuccess } from '../../redux/postSlice';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import LeftNav from '../../components/Navbar/LeftNav';
import { Button, Dialog, DialogActions, DialogContent, Tooltip } from '@mui/material';
import moment from 'moment';
import Loader from '../Loader/Loader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


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

  const likeHandle1 = async () => {
    await axios.put(`/users/love/${currentPost._id}`)
  }

    const likeHandle = async () => {
      dispatch(likeRequest());
      try {
        await axios.put(`/users/love/${currentPost._id}`);
        if (liked) {
          setLiked(false);
        } else {
          setLiked(true);
        }
        dispatch(likeSuccess('Post Liked'));
        const videoRes = await axios.get(`/posts/find/${path}`) //to get video from the postid
        const channelRes = await axios.get(`/users/finds/${videoRes.data.userId}`)  //to get the channel data
        setChannel(channelRes.data)
        dispatch(postSuccess(videoRes.data))
      } catch (error) {
        console.log(error);
        dispatch(likeFailure('Failed to like the post'));
      }
    };
  
  // useEffect(()=> {
  //   likeHandle();
  // },[currentPost._id])
 

  useEffect(() => {
    if (user) {
      currentPost?.likes.forEach((item) => {
        if (item === user._id) {
          setLiked(true);
        }
      });
    }
  }, [currentPost?.likes, user]);


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

        <div  className='v-top'>
          <img onClick={OpenVideo} src={currentPost.imgUrl} width={400} alt="post"/> <br/>
          <Tooltip title="Add to Favorite">
          <span><button onClick={likeHandle}> {liked? <FavoriteIcon style={{'color':'red'}}/> :<FavoriteBorderIcon/>} </button></span>
          </Tooltip>
        </div>


        <div className='v-info'>

         
        <h3>{currentPost.title} </h3>
        <div className='v-data'>
        <p>posted by:  {channel.name}</p>
        <p>{moment(currentPost.createdAt).fromNow()}</p>
        </div>


          <p className='v-desc'>{currentPost.desc}</p>
           
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