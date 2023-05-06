import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingIcon from '@mui/icons-material/Settings'
import Upload from '@mui/icons-material/Upload'
import Category from '@mui/icons-material/Category'
import { AppBar, Drawer, IconButton, Toolbar} from '@mui/material';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const LeftNav = () => {

    const { user } = useSelector(state => state.user)

    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <div className='menu-main'>

            <AppBar className="mobile">

                <Toolbar >
                    <IconButton className='a23' edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer}>
                        <MenuIcon color='red'/>
                    </IconButton>
                </Toolbar>
                <Drawer anchor='left' open={openDrawer} onClose={toggleDrawer}>
                    <Link to="/">

                        <div className='menus' >
                            <HomeIcon />
                            <h4>Home</h4>
                        </div>
                    </Link>
                    <div className='menus' onClick={toggleDrawer}>
                        <Category />
                        <h4>Category</h4>
                    </div>
                    {user ? (

                        <Link to="/upload">
                            <div className='menus'>
                                <Upload />
                                <h4>Upload</h4>
                            </div>
                        </Link>
                    ) : (
                        ""
                    )}

                    <div className='menus'>
                        <SettingIcon />
                        <h4>Settings</h4>
                    </div>
                </Drawer>
            </AppBar>



            <div className='notmob'>

            <Link to="/">

<div className='menus' >
    <HomeIcon />
    <h4>Home</h4>
</div>
</Link>
<div className='menus' onClick={toggleDrawer}>
<Category />
<h4>Category</h4>
</div>
{user ? (

<Link to="/upload">
    <div className='menus'>
        <Upload />
        <h4>Upload</h4>
    </div>
</Link>
) : (
""
)}

<div className='menus'>
<SettingIcon />
<h4>Settings</h4>
</div>
            </div>



        </div>
    )
}

export default LeftNav