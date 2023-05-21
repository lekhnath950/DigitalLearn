import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Post from '../Cards/Post/Post';
import Navbar from './Navbar/Navbar';
import LeftNav from './Navbar/LeftNav';

function Fav(props) {
  const [likes, setLikes] = useState([]);
  const path = useLocation().pathname.split("/")[2]

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/users/likes/${path}`);
        setLikes(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [path]);

  return (
    <>

<div className='main-home' >
    <div>
        <Navbar/>
    </div>
    <div>
        <LeftNav/>
    </div>
    <div className='content-feed'>
      {likes && likes.map((like) => (
        <Post key={like._id} post={like}/>
      ))}
    </div>
    </div>
    </>
  );
}

export default Fav;
