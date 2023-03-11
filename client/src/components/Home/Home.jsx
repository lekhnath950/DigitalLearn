import React, { useEffect, useState } from 'react'
import LeftNav from '../Navbar/LeftNav'
import Navbar from '../Navbar/Navbar'
import './Home.css'
import axios from 'axios'
import Post from '../Post/Post'


 const Home = () => {
  const [post, setPost] = useState([])

  useEffect(()=> {
    const fetchPosts = async () => {
      const post = await axios.get("/posts/random")
      setPost(post.data)
    }
    fetchPosts()
  }, [])

  return (
    <>
    <Navbar/>
<div className='Home'>
    <LeftNav/>
    <Post/>

</div>
</>
  )
}


export default Home