import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Post.css"
import axios from 'axios'
import moment from 'moment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useSelector } from 'react-redux'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API } from '../../config'


const Post = ({ post }) => {

    const {user} = useSelector(state=> state.user) 

    const [channel, setChannel] = useState({})
    const [open, setOpen] = useState(false)

    const [editTitle, setEditTitle] = useState('')
    const [editDesc, setEditDesc] = useState('')

    const handleClose = async () => {
        setOpen(!open)
    }

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`${API}posts/find/${post._id}`)
            setChannel(res.data)
        }
        fetchChannel() 
    }, [post._id])


    const editHandler = async (e,pid) => {
        e.preventDefault();

        try {
            const updatePost = {
                title: editTitle,
                desc: editDesc
            }
           await axios.put(`${API}posts/${pid}`,updatePost)
           setOpen(false)
           setEditTitle('')
           setEditDesc('')
        } catch (error) {
            console.log(error)
        }

    }
    const handleEditPost = () => {
        setEditTitle(post.title);
        setEditDesc(post.desc);
        setOpen(true);
      };


    const deleteHandler = async (pid) => {
        await window.confirm("want to delete?")
        await axios.delete(`${API}posts/${pid}`)
    }

    const [isOpen, setIsOpen] = useState(false);
    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
      };
    return (
        <div> 


            <div className='post'>
                <div className='abb'>
                    <div className='imggg'>
                    <Link to={`/posts/${post._id}`} >
                        <img src={post.imgUrl} alt="thumbnail" className='thumbimg' />
                        </Link>
                    </div>

                    <div className='text-post'>
                        <h3>{post.title} 
                        <span> {moment(post.createdAt).fromNow()}  </span>
                        </h3>


                        <p>{post.desc}</p>
                    </div>

                    <div className='iii'>
                    {/* <FavoriteBorderIcon />
                    <p>{post.likes.length}</p>*/}

                    {
                        user && (user._id === post.userId || user.role === "admin") && (
                            <span onClick={handleDropdownToggle}><MoreHorizIcon/></span> 
                            )
                    }

                    {
                        user && (user._id === post.userId || user.role ==="admin") &&
                        
                            isOpen && (
                                <>
                                <span onClick={handleEditPost}><EditIcon/></span>
                                <span onClick={()=> deleteHandler(post._id)}><DeleteIcon/></span>
                                </>
                                )
                            
                        }  
                    {/* <p>{channel.__v}</p> */}

                    </div>

                    <Dialog className='editD' open={open} onClose={handleClose}>
                        <DialogTitle className='DT'> Edit Your Post <span onClick={handleClose} style={{float:'right'}}>close</span></DialogTitle>
                        <DialogContent className='DC'>
                            <form onSubmit={(e)=> editHandler(e,post._id)}>
                                <label>Title:</label>
                            <textarea type='text' value={editTitle} placeholder='title' onChange={(e)=> setEditTitle(e.target.value)} />
                                <label>Description:</label>
                            <textarea type="text" value={editDesc} placeholder='description' onChange={(e)=> setEditDesc(e.target.value)} />
                            <button type="submit">save</button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
        </div>
    )
}

export default Post