import { useState } from 'react'
import './App.css'
import SubHeader from './Components/SubHeader'
import PostComponent from './Components/PostComponent'
import BodyComponent from './Components/BodyComponent'
import SubmitPost from './Components/SubmitPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SubHeader />
      <BodyComponent />
      <SubmitPost />
    </>
  )
}

export default App
