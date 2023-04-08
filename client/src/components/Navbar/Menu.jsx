import React from 'react'
import HomeIcon from '@mui/icons-material/Home';

const Menu = () => {
  return (
    <div className='menu-main'>
        <div className='menus'>
            <HomeIcon/>
            <h4>Home</h4>
        </div>
        <div className='menus'>
            <HomeIcon/>
            <h4>Category</h4>
        </div>
        <div className='menus'>
            <HomeIcon/>
            <h4>Popular</h4>
        </div>
        <div className='menus'>
            <HomeIcon/>
            <h4>Subscriptions</h4>
        </div>
        <div className='menus'>
            <HomeIcon/>
            <h4>Settings</h4>
        </div>

    </div>
  )
}

export default Menu