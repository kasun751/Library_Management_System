import React, { useContext } from 'react'
import './HeaderComponent.css'
import { userSearch } from '../App'

import prevBtn from '../Images/prev-item.svg'
import nextBtn from '../Images/next-items.svg'
import { logoutFun } from '../../../logoutFun'

function HeaderComponent({onclick}) {
  const {searchData, setSearchData, setFilter} = useContext(userSearch)

  const handleFilter =(val)=>{
    switch(val){ 
      case "1": 
        setFilter("staff")
        break;
      case "2":
        setFilter("registered")
        break;
      case "3":
        setFilter("restricted")
        break;
      default:
        setFilter("")
        break;
    }
  }
  return (
    <div className='main-headerMember'>
    <div className="header-container container">
    <div className="row pt-4 pb-3">
        <div className="col-md-8 col-10">
            <h2>Member Management</h2>
        </div>
        <div className="col-md-3 col-10">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/dashboard">DashBoard</a>
                </li>
                <li className="nav-item" onClick={logoutFun}>
                  <a className="nav-link active" href="/login" onClick={(e) => {
                          e.preventDefault();
                          logoutFun();
                          setTimeout(() => {
                            window.location.href = '/login'; 
                          }, 100); 
                        }}>LogOut</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </div>
        <div className="col-md-3 col-sm-6 col-12 mt-3 ">
            <div className="input-group">
                <span className="filter-tag input-group-text">Filter by</span>
                <select className="form-control" aria-label="Default select example" onChange={(e)=>handleFilter(e.target.value)}>
                <option value="">Show All</option>
                <option value="1">Staff members</option>
                <option value="2">Registered Members</option>
                <option value="3">Restricted Members</option>
              </select>
            </div>
        </div>
        <div className="row col-md-3 col-sm-6 col-12 mt-3">
            <div className="prev-next-btn">
                <button className='btn btn-secondary'  onClick={()=>onclick(-25)}>prev <img src={prevBtn} /></button>
                <button className='btn btn-primary' onClick={()=>onclick(25)}>next <img src={nextBtn} /></button>
            </div>
        </div>
        <div className="col-md-6 col-sm-12 col-12 ">
            <input type="text" className="search-bar form-control" name="searchBar" value={searchData} placeholder="Search" onChange={(e)=>setSearchData(e.target.value)} />
        </div>
    </div>
</div>
</div>

  )
}

export default HeaderComponent
