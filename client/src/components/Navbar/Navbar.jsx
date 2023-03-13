import React from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  return (
    <div className='Navbar-main'>
        <div>
            <h3>DigitalLearn</h3>
        </div>

        <div className='Navbar-search'>
            <input type="text" placeholder="Search" className="searchbar" />
            <SearchIcon/>
        </div>


    </div>
  )
}

export default Navbar