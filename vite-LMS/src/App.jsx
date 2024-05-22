import { useState } from 'react'
import './App.css'
import SubHeader from './Components/SubHeader'
import PostComponent from './Components/PostComponent'
import BodyComponent from './Components/BodyComponent'
import SubmitPost from './Components/SubmitPost'

function App(props) {

  return (
    <>
      <SubHeader member_id={props.member_id} user_type={props.user_type} />
      <BodyComponent member_id={props.member_id} user_type={props.user_type}   />
      <SubmitPost member_id={props.member_id} user_type={props.user_type} />
    </>
  )
}

export default App
