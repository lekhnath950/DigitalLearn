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

    const handleClose = () => {
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
                    <div className='thumbnail post-thumbnail'>
                        <img src={post.imgUrl} alt='thumbnail' className='thumbimg' />
                    </div>



                    {/* </Link> */}
                    <div>
                        <p onClick={clickMe} className='play'><PlayCircleFilledWhiteIcon fontSize='large' /></p>

                        <Accordion className="post2">
                            <AccordionSummary className='post-title' expandIcon={<ExpandMore />}>
                                <h3>{post.title}</h3>

                            </AccordionSummary>
                            <AccordionDetails className='post-content'>
                                <p>{post.desc}</p>
                                {/* <ul> Tags: <li>{post.tags}</li></ul> */}
                                
                        <p className='dialog-updated'>{moment(post.createdAt).fromNow()} </p>
                            </AccordionDetails>
                        </Accordion>


                        <Dialog open={open} onClose={handleClose}>
                            <div className="dialog-title">{post.title}</div>
                            <div className="dialog-close" onClick={handleClose}>X</div>
                            <DialogContent>
                                <video className="dialog-video" controls width={500}>
                                    <source src={post.videoUrl} />
                                </video>
                                <div className="dialog-desc">{post.desc}</div>
                                <div className="dialog-updated">{moment(post.updatedAt).calendar()}</div>
                            </DialogContent>
                        </Dialog>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post