import React from 'react'
import './HeaderComponent.css'

function HeaderComponent() {
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-6 col-10">
            <h2>Member Management</h2>
        </div>
        <div className="col-md-6 col-10">
            <input type="text" className="form-control" name="searchBar" placeholder="Search" />
        </div>
    </div>
</div>

  )
}

export default HeaderComponent
