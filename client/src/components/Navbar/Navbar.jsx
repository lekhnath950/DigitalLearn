import React from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function Navbar() {
  const [dialog, setDialog] = React.useState(false)

  const Dialogbox = () => {
    setDialog(true)
  }

  const handleClose = () => {
    setDialog(false)
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
          <div>
            <Button variant='outlined' onClick={Dialogbox} >Login</Button>
          </div>
          <div>
            <Button variant='outlined' >Sign Up</Button>
          </div>
        </div>

<Dialog open={dialog} onClose={handleClose}>
  <DialogActions>
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
  <DialogTitle>Login</DialogTitle>
  <DialogContent>
          <form>
            <input type='email' placeholder='Email' />
            <input type='password' placeholder='Password' />
            <Button variant='outlined' >Login</Button>
          </form>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default Navbar