import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingIcon from '@mui/icons-material/Settings'
import Upload from '@mui/icons-material/Upload'
import Category from '@mui/icons-material/Category'
import { AppBar, Drawer, IconButton, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const LeftNav = () => {

    const { user } = useSelector(state => state.user)

    const [openDrawer, setOpenDrawer] = useState(false);
    const [tab, setTab] = useState(window.location.pathname);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };


    let id;
    if (user) {
        id = user._id;
    }


    return (
        <div className='menu-main'>

            <AppBar className="mobile">

                <Toolbar >
                    <IconButton className='a23' edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer}>
                        <MenuIcon color='red' />
                    </IconButton>
                </Toolbar>
                <Drawer anchor='left' open={openDrawer} onClose={toggleDrawer}>
                    <Link to="/" onClick={() => setTab("/")}>

                        <div className='menus' >
                            {
                                tab === "/" ? "h" : <HomeIcon />
                            }
                            
                            <h4>Home</h4>
                        </div>
                    </Link>

                    <Link to="/category/" onClick={() => setTab("/")}>
                        <div className='menus' onClick={toggleDrawer}>
                           {tab === "/category/" ? <Category/> : "hi"}
                            <h4>Category</h4>
                        </div>
                    </Link>

                    {user ? (
                        <>

                            <Link to="/upload">
                                <div className='menus'>
                                    <Upload />
                                    <h4>Upload</h4>
                                </div>
                            </Link>
                            <Link to={`/fav/${id}`}>
                                <div className='menus'>
                                    <FavoriteIcon />
                                    <h4>Fav</h4>
                                </div>
                            </Link>

                            <Link to={`/profile/${id}`}>
                                <div className='menus'>
                                    <Upload />
                                    <h4>Profile</h4>
                                </div>
                            </Link>

                        </>
                    ) : (
                        ""
                    )}

                    <div className='menus'>
                        <SettingIcon />
                        <h4>Fav</h4>
                    </div>
                </Drawer>
            </AppBar>



            <div className='notmob'>

                <Link to="/" onClick={() => setTab("/")}>

                    <div className='' >
                        {
                            tab === "/" ? (
                                <div className='menus a1'>
                                    <HomeIcon/>
                                    <h4>Home</h4>
                                </div>
                            ) : (
                                <div className='menus a2'>
                                    <HomeOutlinedIcon/>
                                    <h4>Home</h4>
                                </div>
                            )
                        }
                    </div>
                </Link>

                <Link to="/category/">
                    <div className='menus' onClick={toggleDrawer}>
                        <Category />
                        <h4>Category</h4>
                    </div>
                </Link>


{
   user && user.role === "owner" ? (
        <>
                <Link to="/admin">
                    <div className='menus' onClick={toggleDrawer}>
                        <Category />
                        <h4>Admin</h4>
                    </div>
                </Link>
        
        </>
    ) : ""
}


                {user ? (
                    <>

                        <Link to="/upload">
                            <div className='menus'>
                                <Upload />
                                <h4>Upload</h4>
                            </div>
                        </Link>
                        <Link to={`/fav/${id}`}>
                            <div className='menus'>
                                <FavoriteIcon />
                                <h4>Fav</h4>
                            </div>
                        </Link>

                        <Link to={`/profile/${id}`}>
                            <div className='menus'>
                                <Upload />
                                <h4>Profile</h4>
                            </div>
                        </Link>

                    </>
                ) : (
                    ""
                )}


                <div className='menus'>
                    <SettingIcon />
                    <h4>Settings</h4>
                </div>
                <Link to="/discussion">
                <div className='menus'>
                    <SettingIcon />
                    <h4>Discussion</h4>
                </div>
                </Link>
            </div>



        </div>
    )
}

export default LeftNav