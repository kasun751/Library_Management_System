import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DashBoard from './Pages/DashBoard'
import { getUserID, getUserType } from '../../userAuthFun'

export const userAuthentication = createContext();

function App() {
  const [user_id, setUser_id] = useState(getUserID())
  const [user_type, setUser_type] = useState(getUserType())

  return (
    <userAuthentication.Provider value={{user_id, user_type}}>
      <DashBoard />
    </userAuthentication.Provider>
  )
}

export default App
