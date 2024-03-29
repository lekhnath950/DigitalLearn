import React, { useEffect, useState } from 'react'
import Post from '../../Cards/Post/Post'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import './Home.css'
import {Pagination} from '@mui/material'


const Home = () => {
  const [post, setPost] = useState([])
  const [page, setPage] = useState(1)

  const handleChange = (event,value) => {
      setPage(value)
  }

  useEffect(() => {
    const fetchh = async () => {
      const res = await axios.get("/posts/random")
      setPost(res.data)
    }

    fetchh();
  }, [])


  return (
    <div>
      <Navbar />

      <div className='main-home'>
        <div className='navbar-home'>
          <LeftNav />
        </div>
{/* 
        <div className='content-feed'>
          {post.map((posts) => (
            <Post key={posts.title} post={posts} />
          ))}
        </div> */}


        
        <div className='content-feed'>
          {post.slice((page-1)*6,page*6).map((posts) => (
            <Post key={posts.title} post={posts} />
          ))}
        </div>
      </div>
      <Pagination count={Math.ceil(post.length / 6)} page={page} onChange={handleChange} className='hh' />
    </div>
  )
}

export default Home