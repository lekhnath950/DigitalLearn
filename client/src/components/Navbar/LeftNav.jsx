import React, { useState } from 'react'
import './Navbar.css'
import { AppBar, Drawer, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Menubar from './Menubar'

const Left = () => {

    const [openDrawer, setOpenDrawer] = useState(false);



    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };
  return (
    <div>
        <div className='menu-main'>
            <AppBar className='mobile'>

<Toolbar >
    <IconButton className='a23' edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer}>
        <MenuIcon color='red' />
    </IconButton>
</Toolbar>
<Drawer anchor='left' open={openDrawer} onClose={toggleDrawer}>

            <Menubar/>
            </Drawer>
            </AppBar>

        </div>
        <div  className='notmob'>
            <Menubar/>
        </div>
    </div>
  )
}

export default Left