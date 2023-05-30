import React, { useEffect, useState } from 'react'
import './Upload.css'
// import { useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import LeftNav from '../Navbar/LeftNav';
import { API } from '../../config';


const Upload = () => {

    const [dialog, setDialog] = useState(false)
    const [vid, setVid] = useState(undefined)
    const [img, setImg] = useState(undefined)
    const [imgPer, setImgPer] = useState(0)
    const [vidPer, setVidPer] = useState(0)
    const [tags, setTags] = useState([])
    const [inputs, setInputs] = useState({})


    const [mes, setMes] = useState("")

    const Tag = (e) => {
        setTags(e.target.value.split(","))
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

        if (!inputs.title || !inputs.desc || tags.length === 0 || !inputs.videoUrl || !inputs.imgUrl) {
            console.log('Please fill all the required inputs');
            setMes("Please fill all the required inputs")
            return;
        }

        const data = {
            ...inputs, tags,
            imgUrl: inputs.imgUrl,
            videoUrl: inputs.videoUrl
        }
        const res = await axios.post(API+"posts", data)
        res.status === 200 && console.log(res.data)
        setDialog(false);
        console.log("inputs")
    }


    const DialogBox = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)

        if (inputs.videoUrl) {
            const storage = getStorage(app);
            const videoRef = ref(storage, inputs.videoUrl);
            deleteObject(videoRef)
                .then(() => {
                    console.log('Video file deleted from Firebase Storage');
                })
                .catch((error) => {
                    console.log('Error deleting video file:', error);
                });
        }

        // Delete image file if it has been uploaded
        if (inputs.imgUrl) {
            const storage = getStorage(app);
            const imageRef = ref(storage, inputs.imgUrl);
            deleteObject(imageRef)
                .then(() => {
                    console.log('Image file deleted from Firebase Storage');
                })
                .catch((error) => {
                    console.log('Error deleting image file:', error);
                });
        }

        // Clear all inputs
        setVid(undefined);
        setImg(undefined);
        setImgPer(0);
        setVidPer(0);
        setTags([]);
        setInputs({});
    }

    return (

        <div>

            <div>
                <Navbar />
            </div>
            <div>
                <LeftNav />
            </div>
            <div className='uploadd'>

                <Button variant='outlined' onClick={DialogBox}>click here to Upload </Button>


                <Dialog open={dialog} onClose={handleClose} className='dialog'>
                    <DialogActions>
                        <Button variant='outlined' onClick={handleClose}>close</Button>
                    </DialogActions>
                    <DialogTitle>Upload</DialogTitle>
                    <DialogContent className='dcontent'>
                        <form>
                            <input type="text" placeholder="Title" name='title' onChange={handleInputs} className="custom-input" required /><br />
                            <p>Choose a Video</p>
                            {
                                vidPer > 0 ? ("uploading" + vidPer + "%") : (
                                    <input type="file" accept='video/*' className="custom-file-input" placeholder='Video' onChange={(e) => setVid(e.target.files[0])} required />
                                )
                            }   <br />
                            <input type="text" placeholder='description' name="desc" onChange={handleInputs} className="custom-input" required /> <br />
                            <input type="text" placeholder="tags" onChange={Tag} className="custom-input" required /><br />
                            <p>Choose a Thumbnail</p>
                            {
                                imgPer > 0 ? ("uploading.." + imgPer + "%") : (
                                    <input type="file" className="custom-file-input" accept='image/*' placeholder="thumbnail" onChange={(e) => setImg(e.target.files[0])} required />

                                )
                            } <br />
                            <Button variant='outlined' onClick={handleUpload} className="upload-button">Upload</Button><br />
                            {mes}
                        </form>
                    </DialogContent>
                </Dialog>

            </div>

        </div>
    )
}

export default Upload