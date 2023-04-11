import { Menu } from '@mui/material';
import './App.css';
import Home from './components/Home/Home';
// import Menu from './components/Navbar/Menu';
// import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="">
      <Router>
      <div >
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

      </div>
      </Router>
    </div>
  );
}

export default App;
