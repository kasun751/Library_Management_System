import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DashBoard from './Pages/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DashBoard />
    </>
  )
}

export default App
