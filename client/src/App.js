import './App.css';
import Home from './components/Home/Home';
import Menu from './components/Navbar/Menu';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="">
      <Navbar/>

      <div className='layout'>
        <Menu />
        <Home />
      </div>
    </div>
  );
}

export default App;
