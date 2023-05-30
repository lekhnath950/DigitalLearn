import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Post from '../../Cards/Post/Post'
import { logout } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { API } from '../../config'

const Profile = () => {
  const { user } = useSelector(state => state.user)
  // const {currentPost} = useSelector(state=> state.postx)
  const [prof, setProf] = useState([])

  let id = user._id;
  useEffect(() => {
    const fetchh = async () => {
      const res = await axios.get(`${API}posts/profile/${id}`)
      setProf(res.data)
    }
    fetchh()
  }, [id])

  const navi = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = async (delId) => {
    const confirmed = window.confirm("want to delete your account?")
    if (confirmed) {
      try {
        await axios.delete(`${API}users/${delId}`)
        dispatch(logout())
        alert("Deleted")
        navi("/")
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <LeftNav />
      </div>

      <div className="profile content-feed">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {
          user && user.role !== "admin" &&
          <button onClick={() => handleDelete(user._id)}>Delete account</button>
        }


        {prof ? (
          <p>Total Post:{prof.length}</p>
        ) : ""}

        {prof && prof.map((postq) => (
          <>
            <Post post={postq} />
          </>
        ))}

      </div>

    </div>
  )
}

export default Profile