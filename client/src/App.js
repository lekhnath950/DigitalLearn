import './App.css';
import Home from './components/Home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Video from './Cards/Video/Video';
// import LeftNav from './components/Navbar/LeftNav';

function App() {
  return (
    <div className="">
      <Router>
      <div >
        {/* <LeftNav/> */}
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path="video"> */}
                    <Route path="/posts/:id" element={<Video />} />
        {/* </Route> */}
      </Routes>

      </div>
      </Router>
    </div>
  );
}

export default App;
