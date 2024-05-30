import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Homepage from './Pages/HomePage'
import SideBar from './Components/SideBar'
import LandingPage from './Pages/LandingPage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>

      <Route path='/' element= {<LandingPage/>}/>
      <Route path='/HomePage' element={<Homepage/>}/>
      <Route path='/SignUpPage' element={<SignUpPage/>}/>
      <Route path='/LoginPage' element={<LoginPage/>}/>

    </Routes>
      
    </>
  )
}

export default App;
