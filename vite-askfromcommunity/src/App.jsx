import './App.css'
import SubHeader from './Components/HeaderComponents/SubHeader'
import BodyComponent from './Components/BodyComponents/BodyComponent'
import SubmitPostForm from './Components/FormComponents/SubmitPostForm'

function App(props) {

  return (
    <>
      <BodyComponent user_id={props.user_id} user_type={props.user_type}   />
      <SubmitPostForm user_id={props.user_id} user_type={props.user_type} />
    </>
  )
}

export default App
