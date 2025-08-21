import { useEffect, useState } from 'react'
import './App.css'
import BodyComponent from './Components/BodyComponent'
import FooterComponent from './Components/FooterComponent'
import SubHeader from './Components/SubHeader'
import { SearchDataContext } from './Pages/DonateBookPage'
import { useNavigate } from 'react-router-dom'
import { userAuthFun } from '../../userAuthFun'

function App() {
  const [searchData, setSearchData] = useState("");
  // const navi = useNavigate();
  // useEffect(() => {
  //   userAuthFun(navi);
  // }, []);
  return (
    <SearchDataContext.Provider value={{searchData, setSearchData}}>
      <SubHeader searchBar={false} />
      <BodyComponent />
      <FooterComponent />
    </SearchDataContext.Provider>
  )
}

export default App
