import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Video from './Cards/Video/Video';
<<<<<<< HEAD
import Upload from './components/Upload/Upload';
=======
import Category from './components/Category/Category';
>>>>>>> 7585623981abc7556574d3860654efa6e686dd12

function App() {
  return (
    <div className="">
      <Router>
        <div >
          <Routes>
            <Route path='/' element={<Home />}  />
<<<<<<< HEAD
            <Route path='/upload' element={<Upload />}  />
=======
            <Route path='/category' element={<Category />}  />
>>>>>>> 7585623981abc7556574d3860654efa6e686dd12
            <Route path="/posts/:id" element={<Video />} />
          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;


