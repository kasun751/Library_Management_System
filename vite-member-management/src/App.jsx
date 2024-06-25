import { createContext, useState } from 'react'
import './App.css'
import HeaderComponent from './Components/HeaderComponent'
import BodyComponent from './Components/BodyComponent'
import FooterComponent from './Components/FooterComponent'

export const userAuthentication = createContext();

function App({user_id, user_type}) {
  const [current_user_id, setUser_id] = useState(user_id)
  const [current_user_type, setUser_type] = useState(user_type)


  return (
    <userAuthentication.Provider value={{current_user_id, current_user_type}}>
      <HeaderComponent />
      <BodyComponent />
      <FooterComponent />
    </userAuthentication.Provider>
  )
}

export default App
