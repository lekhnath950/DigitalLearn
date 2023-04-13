import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Post.css"
import axios from 'axios'
import moment from 'moment'
import { Accordion, AccordionDetails, AccordionSummary, Dialog, DialogActions, DialogContent } from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

const Post = ({ post }) => {

    const [channel, setChannel] = React.useState({})
    const [open, setOpen] = useState(false)

    const clickMe = () => {
        setOpen(true)
    }

    const handleClose =()=> {
        setOpen(false)
    }

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/posts/find/${post.userId}`)
            setChannel(res.data)
        }
        fetchChannel()
    }, [post.userId])


    return (
        <div>


            <div className='post'>
                <div className='container'>
                    {/* <Link to={`/posts/${post._id}`} > */}
                        <div className='thumbnail'>
                            <img src={post.imgUrl} alt='thumbnail' className='thumbimg' />
                        </div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogActions>
                                <h6 onClick={handleClose}>X</h6>
                            </DialogActions>
                            <DialogContent >
                                <h3>{post.title}</h3>
                                <video controls width={500}>
                                    <source src={post.videoUrl} />
                                </video>
                                <h6>{post.desc}</h6>
                            </DialogContent>
                        </Dialog>

                    {/* </Link> */}
                    <div>
                    <p onClick={clickMe} className='play'><PlayCircleFilledWhiteIcon fontSize='large'/></p>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                        <h3>{post.title}</h3>

                            </AccordionSummary>
                            <AccordionDetails>
                        <p>{post.desc}</p>

                            </AccordionDetails>
                        </Accordion>

                        {/* <h5>{post.likes.length} Likes </h5> */}
                        <h5>{moment(post.createdAt).fromNow()} </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post