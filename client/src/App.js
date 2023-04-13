import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Video from './Cards/Video/Video';

function App() {
  return (
    <div className="">
      <Router>
        <div >
          <Routes>
            <Route path='/' element={<Home />}  />
            <Route path="/posts/:id" element={<Video />} />
          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;


