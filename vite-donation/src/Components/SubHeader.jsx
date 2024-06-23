import React, { useContext } from 'react'
import './SubHeader.css'
import { SearchDataContext } from '../Pages/DonateBookPage';
import homeBtn from '../Images/home-btn.svg'
function SubHeader({searchBar}) {

  const{searchData, setSearchData} = useContext(SearchDataContext);
  return (
    <>
        <div className='subHeader-donation'>
          <div className='row gy-2 gx-3 align-items-center'>
          <h3 className='col-auto'>Donation Handler</h3>
            {searchBar && <div className="col-auto mb-3 " >
              <input type="text" className="form-control col-lg-2" placeholder="Search" value={searchData} onChange={(e)=>setSearchData(e.target.value)} />
            </div>}
            <a href='/'>
              <img src={homeBtn} id="home-btn" alt="home-btn" />
            </a>
          </div>            
        </div>
    </>
  )
}

export default SubHeader