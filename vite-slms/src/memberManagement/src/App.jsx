import { createContext, useEffect, useState } from 'react'
import './App.css'
import BodyComponent from './Components/BodyComponent'
import FooterComponent from './Components/FooterComponent'
import { useNavigate } from 'react-router-dom';
import { userAuthFun } from '../../userAuthFun';

export const userAuthentication = createContext();
export const userSearch = createContext();



function App({user_id, user_type}) {
  console.log("asdasd"+user_id)
  const [current_user_id, setUser_id] = useState(user_id)
  const [current_user_type, setUser_type] = useState(user_type)
  const [searchData, setSearchData] = useState("")
  const [filter, setFilter] = useState("")
  
  const navi = useNavigate();
  useEffect(() => {
    userAuthFun(navi);
  }, []);

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
