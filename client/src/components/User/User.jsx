import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Disc from '../Discussion/Disc'
import Post from '../../Cards/Post/Post'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'

const User = () => {

    const [info, setInfo] = useState(null)

    const path = useLocation().pathname.split("/")[2]
    console.log(path)
        
        useEffect(()=> {
        const fetchh = async () => {
            const res = await axios.get(`/users/finds/${path}`)
            console.log(res.data)
            setInfo(res.data)
        }
        fetchh()
    },[])
  return (

    <div>

<div>
    <Navbar/>
</div>

<div >
    <LeftNav/>
</div>

      {info && (
        <div>
          <p>{info.name}</p>
          <p>{info.email}</p>
        </div>
      )}

      <div>

        <div className='content-feed'>
            {
                info && info.posts.length > 0 ? (
                    
                       info.posts.map((post)=> (
                            <Post post={post} />
                        ))
                    
                ) : "No post"
            }
        </div>
        <div className='content-feed'>
        {info && info.discs.map((disc) => <Disc disc={disc} reply={disc.reply} key={disc._id} />)}
      </div>
      </div>
    </div>
  )
}

export default User