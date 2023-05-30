import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import './auth.css'
import { API } from '../../config'

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(API+"auth/signup", {name,email,password})
            setMessage(res.data)
        } catch (error) {
            setError(error.response.data)
        }
    }
    
  return (


    <>

    <div>
        <Navbar/>
    </div>
    <div>
        <LeftNav/>
    </div>
    <div className="signup-container">
        <h1>Register here</h1>
    <form onSubmit={submitHandler}>
        <input type="text" placeholder='name' onChange={(e)=> setName(e.target.value)} required/> <br/>
        <input type="email" placeholder='email' onChange={(e)=> setEmail(e.target.value)} required/><br/>
        <input type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} required/><br/>
        <button type='submit'>Signup</button> <br/>
    </form>
    {error && <p>{error}</p>}
    {message && <p>{message}</p>}

    </div>
    </>
  )
}

export default Signup