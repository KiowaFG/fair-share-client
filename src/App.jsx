import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Homepage from './Pages/HomePage'
import SideBar from './Components/SideBar'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/home' element={<Homepage/>}/>
      <Route path="/details" element/>
    </Routes>
    </>
  )
}

export default App
