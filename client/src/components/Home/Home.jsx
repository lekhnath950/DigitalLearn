import React, { useEffect } from 'react'
import Post from '../../Cards/Post/Post'
import axios from 'axios'

const Home = () => {
  const [post, setPost] = React.useState([])

  useEffect(() => {
    const fetchh = async () => {
      const res = await axios.get("/posts/random")
      setPost(res.data)
    }

    fetchh()
  })

  return (
    <div>

      {post.map((posts)=> (
        <Post/> 

      ))}


    </div>
  )
}

export default Home