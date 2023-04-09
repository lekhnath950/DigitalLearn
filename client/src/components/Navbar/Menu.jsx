import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Menu = () => {

    const [dialog, setDialog] = React.useState(false)

    const DialogBox = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }
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
        <div className='menus' onClick={DialogBox}>
            <HomeIcon/>
            <h4>Upload</h4>
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

        <Dialog open={dialog} onClose={handleClose}>
            <DialogActions>
                <Button variant='outlined' onClick={handleClose}>close</Button>
            </DialogActions>
            <DialogTitle>Upload</DialogTitle>
            <DialogContent>
                <form>
                    <input type="text" placeholder="Title" />
                    <input type="file" accept='video/*' placeholder='Video' />
                    <input type="text" placeholder='description' />
                    <input type="text" placeholder="tags" />
                    <input type="text" placeholder="thumbnail" />
                    <Button variant='outlined'>Upload</Button>
                </form>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default Menu