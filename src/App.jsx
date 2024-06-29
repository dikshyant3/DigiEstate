import { useState } from 'react'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Search from './components/Search'


function App() {

  return (
    <div className='max-w-screen h-screen'>
      <Navbar />
      <Search/>
      <Home/>
    </div>
  )
}

export default App
