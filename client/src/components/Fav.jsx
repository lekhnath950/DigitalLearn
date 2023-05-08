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


    <div>
        <Navbar/>
    </div>
    <div style={{marginTop:100}}>
        <LeftNav/>
    </div>
    <div style={{marginLeft:100}}>
      {likes && likes.map((like) => (
        <Post key={like._id} post={like}/>
      ))}
    </div>
    </>
  );
}

export default Fav;
