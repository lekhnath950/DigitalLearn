import React, { useState } from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginFailure, loginRequest, loginSuccess,logout } from '../../redux/userSlice';
import { useSelector } from 'react-redux';


function Navbar() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {user} = useSelector(state=>state.user)

  const dispatch = useDispatch()
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginRequest())
    try {
      const res = await axios.post("auth/login", {email,password})
      dispatch(loginSuccess(res.data))
      console.log(res.data)
    } catch (error) {
      dispatch(loginFailure())
    }
  }

  const [dialog, setDialog] = React.useState(false)

  const Dialogbox = () => {
    setDialog(true)
  }

  const handleClose = () => {
    setDialog(false)
  }

  const logoutt = () => {
    dispatch(logout())
  }

  return (
    <div className='Navbar-main'>
        <div>
            <h3>DigitalLearn</h3>
        </div>

        <div className='Navbar-search'>
            <input type="text" placeholder="Search" className="searchbar" />
            <SearchIcon/>
        </div>

        <div className='auth'>
{
  user ? (
          <div>
            <Button variant='outlined' onClick={logoutt} >Logout</Button>
          </div>

  ) : (
          <div>
            <Button variant='outlined' onClick={Dialogbox} >Login</Button>
          <div>
            <Button variant='outlined' >Sign Up</Button>
          </div>
          </div>

  )
}
        </div>

<Dialog open={dialog} onClose={handleClose}>
  <DialogActions>
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
  <DialogTitle>Login</DialogTitle>
  <DialogContent>
          <form >
            <input type='email' placeholder='Email' onChange={(e)=> setEmail(e.target.value)} />
            <input type='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)} />
            <Button variant='outlined' onClick={handleLogin} >Login</Button>
          </form>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default Navbar