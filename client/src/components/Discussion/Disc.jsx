import axios from 'axios'
import './Discussion.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment'
import SendIcon from '@mui/icons-material/Send';
import { discFailure, discSuccess } from '../../redux/discSlice';


const Disc = ({ disc, reply }) => {

  const { user } = useSelector(state => state.user)
  // const { discus } = useSelector(state => state.discc)

  const [replyInputs, setReplyInputs] = useState({});


  const handleReplyChange = (e, id) => {
    setReplyInputs((prevInputs) => ({
      ...prevInputs,
      [id]: e.target.value,
    }));
  };

  const [open, setOpen] = useState(false)
  const [msgOpen, setMsgOpen] = useState(false)
  const [msg, setMsg] = useState(null)

  const dispatch = useDispatch();
  const deleteHandler = async (id) => {
    try {
      await window.confirm("Want to delete?")
      await axios.delete(`/review/Disc/${id}`)

      const res1 = await axios.post("/review/getdisc")
      dispatch(discSuccess(res1.data));
    } catch (error) {
      dispatch(discFailure(error))
      console.log(error)
    }
  }

  const deleteReply = async (id, replyid) => {
    try {
      await window.confirm("want to delete?")
      const res = await axios.delete(`/review/${id}/replies/${replyid}`)
      setMsg(res.data)
      setMsgOpen(true)
      const res1 = await axios.post("/review/getdisc")
      dispatch(discSuccess(res1.data));
    } catch (error) {
      console.log(error)
    }
  }

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

    const res = await axios.post("/review/getdisc")
    dispatch(discSuccess(res.data));
    console.log(res.data)


    setReplyInputs((prevInputs) => ({
      ...prevInputs,
      [id]: "", // Clear the reply input after submitting
    }));

  };

  useEffect(() => {
    setReplyInputs({});
  }, [reply]);



  return (
    <div >

      <>
        <div>
          <div className="Disc" >
            <h4 className="D-topic">{disc.topic}</h4>
            <div className='D-info'>
              <p> <span>Posted by:</span>
                {user && disc.userId && disc.userId._id && (disc.userId._id !== user._id)
                  ? <>{disc.userId.name} </> : "you"}
              </p>

              <p>{moment(disc.createdAt).fromNow()}</p>
              {
                user && disc.userId && (disc.userId._id === user._id) ? (
                  <span onClick={() => deleteHandler(disc._id, disc.userId)}><DeleteIcon fontSize="small" /></span>
                ) : null
              }
            </div>



            <form onSubmit={(e) => handleReply(e, disc._id)} className='D-rep' >
              <textarea maxLength={1000} value={replyInputs[disc._id] || ""} type="text" placeholder={user ? "Add a Reply" : "Login to add a reply"} onChange={(e) => handleReplyChange(e, disc._id)} />
              <button disabled={!user}><SendIcon fontSize="small" /></button>
            </form>

            {reply &&
              reply.map((replydisc) => (
                <>
                  <div className='D-replies'>
                    <div className="D-reply" key={replydisc._id}>
                      <p className='D-replyName'>Replied by {user && disc && (replydisc.userId._id === user._id) ? "you" : replydisc.userId.name}</p>
                      <p className="D-replied">{replydisc.rep}</p>
                    </div>

                    <div className='D-footer'>
                      <p>{moment(replydisc.time).fromNow()}</p>
                      {
                        user && replydisc && (replydisc.userId._id === user._id) ? (
                          <span onClick={() => deleteReply(disc._id, replydisc._id)}><DeleteIcon fontSize="small" /></span>
                        ) : ""
                      }

                    </div>


                  </div>
                </>
              ))}
            <p className='no-reply'>{disc.reply?.length === 0 ? "No Reply" : ""} </p>

          </div>
        </div>

      </>
    </div>
  )
}

export default Disc