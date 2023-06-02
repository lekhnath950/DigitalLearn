import { Button, Pagination } from '@mui/material'
import Post from '../../Cards/Post/Post'
import LeftNav from '../Navbar/LeftNav'
import Navbar from '../Navbar/Navbar'
import './Category.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Category = () => {
  const [post, setPost] = useState([])
  const [page,setPage] = useState(1)
  const [tags, setTags] = useState([])

  const handleChange = (event,value) => {
    setPage(value)
}

useEffect(()=> {
  const fetchh = async () => {
    const res = await axios.get('/posts/tag')
    setTags(res.data)
  }
  fetchh();
},[])

useEffect(() => {
  const fetchh = async () => {
    const res = await axios.get("/posts/trend")
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


        <div className='category'>
          <h2>Category</h2>



          <div>
      <ul className='tags-ul'>
        {tags.map((tag) => (
          <li key={tag._id}>
            <Button variant='outlined'>
            <Link to={`/tag/${tag._id}`}>{tag._id} ({tag.count})</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>


          <div className='content-feed'>
            {post.slice((page - 1) * 2, page * 2).map((posts) => (

                <Post key={posts.title} post={posts} />

            ))}
          </div>


          <Pagination count={Math.ceil(post.length / 2)} page={page} onChange={handleChange} className='hh' />

        </div>

      </div>
    </div>


      
    
  )
}

export default Category