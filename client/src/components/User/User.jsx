import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Disc from '../Discussion/Disc';
import Post from '../../Cards/Post/Post';
import Navbar from '../Navbar/Navbar';
import LeftNav from '../Navbar/LeftNav';
import './User.css'; // Import the CSS file
// import { useDispatch } from 'react-redux';
// import { logout } from '../../redux/userSlice';

const User = () => {
  const [info, setInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('posts'); // Add state for the active tab

  const path = useLocation().pathname.split('/')[2];
  console.log(path);

  useEffect(() => {
    const fetchh = async () => {
      const res = await axios.get(`/users/finds/${path}`);
      console.log(res.data);
      setInfo(res.data);
    };
    fetchh();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // const navi = useNavigate()
  // const dispatch = useDispatch()

  // const handleDelete = async(delId) => {
  //   const confirmed = window.confirm("want to delete your account?")
  //   if(confirmed) {
  //     try {
  //       await axios.delete(`/users/${delId}`)
  //       dispatch(logout())
  //       alert("Deleted")
  //       navi("/")
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <LeftNav />
      </div>

      <div className='user-style'>

      {info && (
        <div className='user-info'>
          <p>Name: {info.name}</p>
          <p>Email: {info.email}</p>
          {/* <button onClick={()=> handleDelete(info._id)}>Delete account</button> */}
        </div>
      )}

      <div className="user-container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => handleTabClick('posts')}
          >
            Posts
          </div>
          <div
            className={`tab ${activeTab === 'discussions' ? 'active' : ''}`}
            onClick={() => handleTabClick('discussions')}
          >
            Discussions
          </div>
        </div>

        <div className="content">
          <div style={{'marginLeft':'auto'}} className='content-feed'>
          {activeTab === 'posts' && info && info.posts.length > 0 ? (
            info.posts.map((post) => <Post post={post} key={post._id} />)
          ) : (
            ""
          )}
          </div>

          {activeTab === 'discussions' && info && info.discs.length > 0 ? (
            info.discs.map((disc) => (
              <Disc disc={disc} reply={disc.reply} key={disc._id} />
            ))
          ) : (
            ""
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default User;
