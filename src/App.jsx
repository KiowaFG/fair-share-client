import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Homepage from './Pages/HomePage'
import SideBar from './Components/SideBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Homepage/>
    </>
  )
}

export default App
