import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingIcon from '@mui/icons-material/Settings'
import Upload from '@mui/icons-material/Upload'
import Category from '@mui/icons-material/Category'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const LeftNav = () => {

    const [dialog, setDialog] = useState(false)
    const [vid, setVid] = useState(undefined)
    const [img, setImg] = useState(undefined)
    const [imgPer, setImgPer] = useState(0)
    const [vidPer, setVidPer] = useState(0)
    const [tags, setTags] = useState([])
    const [inputs, setInputs] = useState({})

    const { user } = useSelector(state => state.user)


    const Tag = (e) => {
        setTags(e.target.value.split(","))
    }

    const DialogBox = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }

    const handleInputs = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const upload = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
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
            (error) => { },

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                    console.log("getdownloadurl")
                });
            }
        );

    }

    useEffect(() => {
        vid && upload(vid, "videoUrl");
    }, [vid])

    useEffect(() => {
        img && upload(img, "imgUrl");
    }, [img])

    const handleUpload = async (e) => {
        e.preventDefault();
        const data = {
            ...inputs, tags,
            imgUrl: inputs.imgUrl,
            videoUrl: inputs.videoUrl
        }
        const res = await axios.post("/posts", data)
        res.status === 200 && console.log(res.data)
        setDialog(false);
        console.log("inputs")
    }
    return (
        <div className='menu-main'>

            <Link to="/">

                <div className='menus'>
                    <HomeIcon />
                    <h4>Home</h4>
                </div>
            </Link>
            <div className='menus'>
                <Category />
                <h4>Category</h4>
            </div>
            {user ? (

                <div className='menus' onClick={DialogBox}>
                    <Upload />
                    <h4>Upload</h4>
                </div>
            ) : (
                ""
            )}

            <div className='menus'>
                <SettingIcon />
                <h4>Settings</h4>
            </div>

            <Dialog open={dialog} onClose={handleClose}>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>close</Button>
                </DialogActions>
                <DialogTitle>Upload</DialogTitle>
                <DialogContent>
                    <form>
                        <input type="text" placeholder="Title" name='title' onChange={handleInputs} /><br />
                        <p>Choose a Video</p>
                        {
                            vidPer > 0 ? ("uploading" + vidPer + "%") : (
                                <input type="file" accept='video/*' placeholder='Video' onChange={(e) => setVid(e.target.files[0])} />
                            )
                        }   <br />
                        <input type="text" placeholder='description' name="desc" onChange={handleInputs} /> <br />
                        <input type="text" placeholder="tags" onChange={Tag} /><br />
                        <p>Choose a Thumbnail</p>
                        {
                            imgPer > 0 ? ("uploading.." + imgPer + "%") : (
                                <input type="file" accept='image/*' placeholder="thumbnail" onChange={(e) => setImg(e.target.files[0])} />

                            )
                        } <br />
                        <Button variant='outlined' onClick={handleUpload} >Upload</Button><br />
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default LeftNav