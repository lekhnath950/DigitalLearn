import React, { useState } from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginFailure, loginRequest, loginSuccess, logout } from '../../redux/userSlice';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Post from '../../Cards/Post/Post'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import ErrorIcon from '@mui/icons-material/Error';


function Navbar() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, message } = useSelector(state => state.user)
  const [dialog, setDialog] = React.useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const [messageVisible, setMessageVisible] = useState(true)


  const navi = useNavigate()

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginRequest())
    try {
      const res = await axios.post("/auth/login", { email, password })
      setDialog(false)
      dispatch(loginSuccess({ user: res.data, message: res.data.message }))
      navi("/")
    } catch (error) {
      dispatch(loginFailure({ message: error.response.data.message }))
      setMessageVisible(true) // show message
      setTimeout(() => setMessageVisible(false), 10000) // hide message after 5 seconds

    }
  }


  const Dialogbox = () => {
    setDialog(true)
    setMessageVisible(false)

  }

  const handleClose = () => {
    setDialog(false)
    setMessageVisible(false)
  }

  const logoutt = async () => {
    await navi("/")
    await axios.post("/auth/logout")
    dispatch(logout())
  }

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [openSearch, setOpenSearch] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/posts/search?q=${query}`);
      const data = await response.json();
      setResults(data);
      setOpenSearch(true)
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false)
  }

  return (
    <div className=''>
      <div className='Navbar-main'>

        <div className='aa'>
          <Link to="/" >
            <h3>DigitalLearn</h3>
          </Link>
        </div>

        <div className='Navbar-search'>
          <form onSubmit={handleSubmit}>
            <input type="text" value={query} onChange={handleInputChange} placeholder="Search" className="searchbar" />
            <button type='submit' className='searchInputButton'><SearchIcon /></button>
          </form>

        </div>



        <div className='auth'>
          {
            user ? (
              <div>
                <Button variant='outlined' onClick={logoutt} >Logout</Button>
              </div>

            ) : (
              <div className='auth-right'>
                <Button variant='outlined' onClick={Dialogbox} >Login</Button>
                <div>
                  <Link to="/signup">
                    <Button variant='outlined' >Sign Up</Button>
                  </Link>
                </div>
              </div>

            )
          }
        </div>
      </div>

      <Dialog open={openSearch} onClose={handleCloseSearch}>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCloseSearch}>Close</Button>
        </DialogActions>
        <DialogTitle>
        </DialogTitle>
        <DialogContent>
          <div>
            {results.length > 0 ? (
              results.map((result) => (
                <div key={result._id}>
                  <h2>{result.title}</h2>
                  <p>{result.desc}</p>
                  <p>
                    <Link to={`/posts/${result._id}`} >Open</Link>
                    

                  </p>
                  <hr />
                </div>))) : "No content Available"}



          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={dialog} onClose={handleClose} className="loginForm">
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        <DialogTitle className="dialog-title-login">Login</DialogTitle>
        <DialogContent className="dialog-content">
          <form >
            <div className='inputField'>
              <AlternateEmailIcon />
              <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className='inputField'>
              <LockIcon />
              <input type={showPassword ? "text" : "password"} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
              <div style={{ 'cursor': 'pointer' }} onClick={handleToggleShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>

            {messageVisible && message ? (
              <div className='login-error'>
                <ErrorIcon />
                {message}
              </div>
            ) : ""

            }



            <Button className='login-bt' variant='outlined' onClick={handleLogin} >Login</Button>
          </form>




          <Link to="/signup" className='new-user'>
            <p >New User? Register here!</p>
          </Link>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Navbar