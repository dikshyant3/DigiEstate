import { useState } from 'react'
import Navbar from "./components/Navbar"
import Home from "./components/Home"


function App() {

  return (
    <div className='max-w-screen h-screen'>
      <Navbar />
      <Home/>
    </div>
  )
}

export default App
