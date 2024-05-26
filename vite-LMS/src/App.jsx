import { useState } from 'react'
import './App.css'
import SubHeader from './Components/SubHeader'
import PostComponent from './Components/PostComponent'
import BodyComponent from './Components/BodyComponent'
import SubmitPost from './Components/SubmitPost'

function App(props) {

  return (
    <>
      <SubHeader user_id={props.user_id} user_type={props.user_type} />
      <BodyComponent user_id={props.user_id} user_type={props.user_type}   />
      <SubmitPost user_id={props.user_id} user_type={props.user_type} />
    </>
  )
}

export default App
