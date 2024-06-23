import { useState } from 'react'
import './App.css'
import BodyComponent from './Components/BodyComponent'
import FooterComponent from './Components/FooterComponent'
import SubHeader from './Components/SubHeader'
import { SearchDataContext } from './Pages/DonateBookPage'

function App() {
  const [searchData, setSearchData] = useState("");
  return (
    <SearchDataContext.Provider value={{searchData, setSearchData}}>
      <SubHeader searchBar={false} />
      <BodyComponent />
      <FooterComponent />
    </SearchDataContext.Provider>
  )
}

export default App
