import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Homepage from './Pages/HomePage'
import SideBar from './Components/SideBar'
import LandingPage from './Pages/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element= {<LandingPage/>}/>
      <Route path='/HomePage' element={<Homepage/>}/>
    </Routes>
      
    </>
  )
}

export default App
