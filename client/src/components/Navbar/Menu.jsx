import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';


const Menu = () => {

    const [dialog, setDialog] = React.useState(false)
    const [vid, setVid] = useState(undefined)
    const [vidPer, setVidPer] = useState(0)
    const [img, setImg] = useState(undefined)
    const [imgPer, setImgPer] = useState(0)
    const [tags, setTags] = useState([])
    const [inputs, setInputs] = useState({})

    const Tag = (e) => {
        setTags(e.target.value.split(","))
    }

    const DialogBox = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }

    const handleInputs =(e) => {
        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const upload = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'posts/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === "imgUrl" ? setImgPer(Math.round(progress)) : setVidPer(Math.round(progress))
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
            break;
    }
  }, 

  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setInputs((prev)=> {
        return{...prev, [urlType]: downloadURL}
      })
    });
  }
);

    }

    useEffect(()=> {vid && upload(vid)}, [vid, "videoUrl" ])
    useEffect(()=> {img && upload(img)}, [img, "imgUrl"])

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
                    <input type="text" placeholder="Title" name='title' onChange={handleInputs} />
                    {
                   vidPer>0?("uploading" + vidPer) :(
                       <input type="file" accept='video/*' placeholder='Video' onChange={(e)=> setVid(e.target.files[0])} />

                   )
                    }    
                    <input type="text" placeholder='description' name="desc" onChange={handleInputs} />
                    <input type="text" placeholder="tags" onChange={Tag} />

                    {
                        imgPer>0? ("uploading.." + imgPer) : (
                            <input type="file" accept='image/*' placeholder="thumbnail" onChange={(e)=> setImg(e.target.files[0])} />

                        ) 
                        }
                    <Button variant='outlined'>Upload</Button>
                </form>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default Menu