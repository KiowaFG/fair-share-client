import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Homepage from './Pages/HomePage'
import SideBar from './Components/SideBar'
import { Routes, Route } from 'react-router-dom'
import DetailsPage from './Pages/DetailsPage'
import LandingPage from './Pages/LandingPage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'


function App() {
  const[showSidebar, setShowSidebar] = useState(false)

  return (
    <>

         <Header setShowSidebar={setShowSidebar}/>
         <div className='bodyView'>
    {showSidebar && <SideBar setShowSidebar={setShowSidebar}/>}
    <Routes>
      <Route path='/' element= {<LandingPage/>}/>
      <Route path='/home' element={<Homepage/>}/>
      <Route path="/details" element={<DetailsPage/>}/>
              <Route path='/SignUpPage' element={<SignUpPage/>}/>
      <Route path='/LoginPage' element={<LoginPage/>}/>
    </Routes>
    </div>

    </>
  )
}

export default App;
