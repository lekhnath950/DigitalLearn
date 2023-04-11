import React, { useEffect } from 'react'
import Post from '../../Cards/Post/Post'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import './Home.css'

const Home = () => {
  const [post, setPost] = React.useState([])

  useEffect(() => {
    const fetchh = async () => {
      const res = await axios.get("/posts/random")
      setPost(res.data)
    }

    fetchh() ;
  }, [])

  return (
    <div>
      <Navbar/>

      
      <div className='home'>
        <LeftNav/>

      {post.map((posts)=> (
        <Post key={post._id} post={posts}/> 

      ))}

</div>


    </div>
  )
}

export default Home