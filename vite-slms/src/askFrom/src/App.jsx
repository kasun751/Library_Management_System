import './App.css'
import SubHeader from './Components/HeaderComponents/SubHeader'
import BodyComponent from './Components/BodyComponents/BodyComponent'
import SubmitPostForm from './Components/FormComponents/SubmitPostForm'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAuthFun } from '../../userAuthFun'

export const userAuthentication = createContext({})

function App(props) {
  const [user_id, setUser_id] = useState();
  const [user_type, setUser_type] = useState();

  useEffect(()=>{
    setUser_id(props.user_id)
    setUser_type(props.user_type)
  },[])

  const navi = useNavigate();
  useEffect(() => {
    userAuthFun(navi);
  }, []);


  return (
    <userAuthentication.Provider value={{user_id, user_type}}>
      <BodyComponent user_id={props.user_id} user_type={props.user_type}   />
      <SubmitPostForm user_id={props.user_id} user_type={props.user_type} />
    </userAuthentication.Provider>
  )
}

export default App
