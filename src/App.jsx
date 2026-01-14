import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./Components/Navbar"
import HeroSliders from './Components/HeroSliders'
import FeaturedProducts from './Components/FeaturedProducts'
import TopProducts from './Components/TopProducts'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <HeroSliders/>
      <FeaturedProducts/>
      <TopProducts/>
    </>
  )
}

export default App
