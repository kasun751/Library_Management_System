import React, { useContext } from 'react'
import './HeaderComponent.css'
import { userSearch } from '../App'

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
    <div className="header-container container">
    <div className="row pt-4 pb-3">
        <div className="col-md-8 col-10">
            <h2>Member Management</h2>
        </div>
        <div className="col-md-3 col-10">
            <input type="text" className="form-control" name="searchBar" value={searchData} placeholder="Search" onChange={(e)=>setSearchData(e.target.value)} />
        </div>
        <div className="col-md-3 col-10 mt-3">
            <div className="input-group">
                <span className="input-group-text">Filter by</span>
                <select className="form-select" aria-label="Default select example" onChange={(e)=>handleFilter(e.target.value)}>
                <option value="">Show All</option>
                <option value="1">Staff members</option>
                <option value="2">Registered Members</option>
                <option value="3">Restricted Members</option>
              </select>
            </div>
        </div>
        <div className="row col-md-3 col-10 mt-3">
            <div className="input-group w-50">
                <button onClick={()=>onclick(-5)}>prev</button>
                <button onClick={()=>onclick(5)}>next</button>
            </div>
            <div className="w-50 ">
                <button >Summary</button>
            </div>
        </div>
    </div>
</div>

  )
}

export default HeaderComponent
