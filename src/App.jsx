import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./Components/Navbar"

import Routings from './Routing/Routings'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Routings />
    </>
  )
}

export default App
