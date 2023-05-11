import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import './Profile.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Post from '../../Cards/Post/Post'

const Profile = () => {
    const {user} = useSelector(state=> state.user)
    // const {currentPost} = useSelector(state=> state.postx)
    const [prof, setProf] = useState([])

    let id = user._id;

    useEffect(()=> {
        const fetchh = async() => {
            const res = await axios.get(`/posts/find/${id}`)
            console.log(res.data)
            setProf(res.data)
        }
        fetchh()
    },[id])
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
            <LeftNav />
        </div>

        <div className="profile">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>jpt: {user.__v}</p>

            {prof && prof.map((postq)=> (
                <>
                <Post post={postq} />
                </>
            ))}

        </div>
        
    </div>
  )
}

export default Profile