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

function Navbar() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user } = useSelector(state => state.user)
  const [dialog, setDialog] = React.useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch()
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginRequest())
    try {
      const res = await axios.post("auth/login", { email, password })
      setDialog(false)
      dispatch(loginSuccess(res.data))
    } catch (error) {
      dispatch(loginFailure())
    }
  }


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
        <SearchIcon />
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
                <Button variant='outlined' disabled>Sign Up</Button>
              </div>
            </div>

          )
        }
      </div>

      <Dialog open={dialog} className='' onClose={handleClose}>
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        <DialogTitle className="dialog-title-login">Login</DialogTitle>
        <DialogContent className="dialog-content">
          <form >
            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
            <input type={showPassword ? "text" : "password"} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
            <div onClick={handleToggleShowPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </div>
            <Button variant='outlined' onClick={handleLogin} >Login</Button>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Navbar