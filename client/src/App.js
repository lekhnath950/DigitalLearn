import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Video from './Cards/Video/Video';
import Upload from './components/Upload/Upload';
import Category from './components/Category/Category';
import Fav from './components/Fav';
import Profile from './components/Profile/Profile';
import Admin from './components/AdminPanel/Admin';
import { useSelector } from 'react-redux';
import Signup from './components/Auth/Signup';
import Tag from './components/Category/Tag';
import Discussion from './components/Discussion/Discussion';

function App() {
  const {user} = useSelector(state=> state.user)
  return (
    <div className="">
      <Router>
        <div >
          <Routes>
            <Route path='/' element={<Home />}  />
            <Route path='/category' element={<Category />}  />
            <Route path='/signup' element={<Signup />}  />
            <Route path='/discussion' element={<Discussion />}  />
            
            <Route path='/tag/:tag' element={<Tag />}  />
            {
              user && user.role === "owner" ? (
                <Route path='/admin' element={<Admin />}  />
                
                ) : ("")
              }
            {
              user && (user.role === "admin" || user.role === "owner") ? (
                <Route path='/upload' element={<Upload />}  />

              ) : ("")
            }
            <Route path="/posts/:id" element={<Video />} />
            <Route path="/fav/:id" element={<Fav />} />
            <Route path="/profile/:id" element={<Profile />} />

          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;


