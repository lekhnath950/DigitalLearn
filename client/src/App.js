import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Video from './Cards/Video/Video';
import Upload from './components/Upload/Upload';
import Category from './components/Category/Category';
import Fav from './components/Fav';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="">
      <Router>
        <div >
          <Routes>
            <Route path='/' element={<Home />}  />
            <Route path='/upload' element={<Upload />}  />
            <Route path='/category' element={<Category />}  />
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


