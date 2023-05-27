import { discSuccess } from '../../redux/discSlice';
import axios from 'axios'
import './Discussion.css'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Disc from './Disc'
import Search from '@mui/icons-material/Search'

const Discussion = () => {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [open, setOpen] = useState(false)
  const [msgOpen, setMsgOpen] = useState(false)
  const [msg, setMsg] = useState(null)

  const { discus } = useSelector(state => state.discc)


  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.post(`/review/discussion?page=${currentPage}`);
        dispatch(discSuccess([...response.data.discussions]));
        setTotalPages(response.data.totalPages);


      } catch (error) {
        console.log(error);
      }
    };
    fetchDiscussions()
  }, [currentPage])


  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const [topic, setTopic] = useState("");

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
    setOpen(!open)

    const res = await axios.post("/review/getdisc")
    dispatch(discSuccess(res.data))
  };

  const handleOpen = () => {
    setOpen(!open)
  }

  const [query, setQuery] = useState("")
  const [result, setResult] = useState([])

  const searchHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/review/disc/search?search=${query}`)
      setResult(res.data)
      dispatch(discSuccess(res.data))
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


<div className='dis'>
        <div>
          <form onSubmit={searchHandle} className='d-search'>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='search' />
            <button><Search /></button>
          </form>
        </div>

        <div className="addDisc">
          <Button onClick={handleOpen}><AddCircleIcon />Create Discussion</Button>

          <Dialog open={open} onClose={handleOpen}>

            <DialogActions>
              <button onClick={handleOpen}>X</button>
            </DialogActions>

            <DialogTitle> Add a Discussion</DialogTitle>

            <DialogContent>
              <form onSubmit={handleSubmit} className='ask'>
                <textarea value={topic} type="text" placeholder="Topic" onChange={(e) => setTopic(e.target.value)} />
                <button variant='outlined'>Post</button>
              </form>
            </DialogContent>

          </Dialog>
        </div>

        </div>


        {
          result && result.map(disc => (
            <>
              <Disc key={disc._id} disc={disc} reply={disc.reply} />
            </>
          ))
        }



        {
          discus && discus.map(disc => (
            <>
              <Disc key={disc.topic} disc={disc} reply={disc.reply} currentPage={currentPage} />
            </>
          ))
        }

      </div>

      {currentPage < totalPages && (
        <button className='load-more' onClick={loadMore}>Load more</button>
      )}

      <Snackbar open={msgOpen} message={msg && msg} autoHideDuration={1000} />

    </div>
  );
};

export default Discussion;
