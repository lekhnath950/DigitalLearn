import axios from 'axios'
import './Discussion.css'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import moment from 'moment'
import SendIcon from '@mui/icons-material/Send';

const Discussion = () => {

  const { user } = useSelector(state => state.user)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [dis, setDis] = useState([]);

  useEffect(()=> {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.post(`/review/discussion?page=${currentPage}`);
        console.log(response)
        setDis([...dis, ...response.data.discussions]); // Append new discussions to the existing discussions
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDiscussions()
  },[currentPage])

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const [topic, setTopic] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "/review/add",
      { topic },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleReplyChange = (e, id) => {
    setReplyInputs((prevInputs) => ({
      ...prevInputs,
      [id]: e.target.value,
    }));
  };

  const handleReply = async (e, id) => {
    e.preventDefault();
    await axios.post(
      `/review/addReply/${id}`,
      { rep: replyInputs[id] },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };


  const [open, setOpen] = useState(false)
  const [msgOpen, setMsgOpen] = useState(false)
  const [msg, setMsg] = useState(null)

  const handleOpen = () => {
    setOpen(!open)
  }

  const deleteHandler = async (id) => {
    try {
      await window.confirm("Want to delete?")
      await axios.delete(`/review/Disc/${id}`)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const deleteReply = async (id, replyid) => {
    try {
      await window.confirm("want to delete?")
      const res =  await axios.delete(`/review/${id}/replies/${replyid}`)
      setMsg(res.data)
      setMsgOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <LeftNav />
      </div>

      <div className="discussion">

        <div className="addDisc">
          <Button onClick={handleOpen}><AddCircleIcon />Create Discussion</Button>

          <Dialog open={open} onClose={handleOpen}>

            <DialogActions>
              <button onClick={handleOpen}>X</button>
            </DialogActions>

            <DialogTitle> Add a Discussion</DialogTitle>

            <DialogContent>
              <form onSubmit={handleSubmit} className='ask'>
                <input value={topic} type="text" placeholder="Topic" onChange={(e) => setTopic(e.target.value)} />
                <button>Submit</button>
              </form>
            </DialogContent>

          </Dialog>
        </div>

        <div>
          {dis &&
            dis.map((item) => (
              <div className="Disc" >
                <h4 className="D-topic">{item.topic}</h4>
                <div className='D-info'>
                  <p><span>Posted by:</span>{user && item && (item.userId._id === user._id) ? "you" : item.userId.name}</p>
                  <p>{moment(item.createdAt).fromNow()}</p>
                  {
                    user && item && (item.userId._id === user._id) ? (
                      <span onClick={() => deleteHandler(item._id, item.userId)}><DeleteIcon fontSize="small"/></span>
                    ) : null
                  }
                </div>



                <form onSubmit={(e) => handleReply(e, item._id)} className='D-rep' >
                  <textarea maxLength={1000} value={replyInputs[item._id] || ""} type="text" placeholder={user? "Add a Reply": "Login to add a reply"} onChange={(e) => handleReplyChange(e, item._id)} />
                  <button disabled={!user}><SendIcon fontSize="small" /></button>
                </form>

                { item &&
                  item.reply.map((replyItem) => (
                    <>
                      <div className='D-replies'>
                        <div className="D-reply" key={replyItem._id}>
                          <p className='D-replyName'>Replied by {user && item && (replyItem.userId._id === user._id) ? "you" : replyItem.userId.name}</p>
                          <p className="D-replied">{replyItem.rep}</p>
                        </div>

                        <div className='D-footer'>
                          <p>{moment(replyItem.time).fromNow()}</p>
                          {
                            user && replyItem && (replyItem.userId._id === user._id) ? (
                              <span onClick={() => deleteReply(item._id, replyItem._id)}><DeleteIcon fontSize="small"/></span>
                            ) : ""
                          }

                        </div>


                      </div>
                    </>
                  ))}
                {item.reply.length === 0 ? "No Reply" : ""}
              </div>
            ))}
        </div>
      </div>

            {currentPage < totalPages && (
            <button style={{'marginLeft':'50vw'}} onClick={loadMore}>Load more</button>
            )}

            <Snackbar open={msgOpen} message={msg && msg} autoHideDuration={1000} />

    </div>
  );
};

export default Discussion;
