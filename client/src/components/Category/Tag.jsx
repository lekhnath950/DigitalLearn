import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import Post from '../../Cards/Post/Post'

const Tag = () => {

    const {tag} = useParams()
    const [postT, setPostT] = useState([])

    useEffect(()=> {
        const fetchh = async () => {
            const res = await axios.get(`/posts/tags?tags=${tag}`)
            setPostT(res.data)
        }
        fetchh();
    },[tag])
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
            <LeftNav/>
        </div>
        <div style={{"margin":200}} className='content-feed'>
            {
                postT && postT.map((tag)=> 
                (

                    <Post post={tag} key={tag._id} />
                ) )
            }
        </div>
    </div>
  )
}

export default Tag