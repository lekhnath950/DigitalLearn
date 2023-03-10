import React from 'react'
import LeftNav from '../Navbar/LeftNav'
import Navbar from '../Navbar/Navbar'
import './Home.css'

function Home() {
  return (
    <>
        <Navbar/>
    <div className='Home'>
        <LeftNav/>
        <h3>Main</h3>
    </div>
    </>
  )
}

export default Home