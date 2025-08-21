import { createContext, useState } from 'react'
import './App.css'
import BodyComponent from './Components/BodyComponent'
import FooterComponent from './Components/FooterComponent'

export const userAuthentication = createContext();
export const userSearch = createContext();

function App({user_id, user_type}) {
  const [current_user_id, setUser_id] = useState(user_id)
  const [current_user_type, setUser_type] = useState(user_type)
  const [searchData, setSearchData] = useState("")
  const [filter, setFilter] = useState("")
  


  return (
    <userAuthentication.Provider value={{current_user_id, current_user_type}}>
    <userSearch.Provider value={{searchData, setSearchData, filter, setFilter}}>
      <BodyComponent />
      <FooterComponent />
    </userSearch.Provider>
    </userAuthentication.Provider>
  )
}

export default App
