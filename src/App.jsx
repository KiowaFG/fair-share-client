import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Homepage from './Pages/HomePage'
import SideBar from './Components/SideBar'
import { Routes, Route } from 'react-router-dom'
import DetailsPage from './Pages/DetailsPage'

function App() {
  const[showSidebar, setShowSidebar] = useState(false)

  return (
    <>
         <Header setShowSidebar={setShowSidebar}/>
         <div className='bodyView'>
    {showSidebar && <SideBar setShowSidebar={setShowSidebar}/>}
    <Routes>
      <Route path='/home' element={<Homepage/>}/>
      <Route path="/details" element={<DetailsPage/>}/>
    </Routes>
    </div>
    </>
  )
}

export default App
