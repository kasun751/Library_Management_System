import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DashBoard.css';
import HeaderComponent from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import axios from 'axios';
import { userAuthentication } from '../App';

function DashBoard() {
  const[openProfile, setOpenProfile] = useState(false);
  const[profileDetails, setProfileDetails] = useState([]);

  const {user_id, user_type} = useContext(userAuthentication);
  const [editDetails, setEditDetails] = useState({
    property1:"kasun",
    property2:""
  })

  async function loardProfileData(){
    try{
      const res = await axios.get(`http://localhost:80/project_1/Dashboard/Controller/userProfileController.php?user_id=${user_id}`)
      setProfileDetails(res.data)
    }catch(error){
      console.error();
    }
  }

  async function editProfileData(para,val){
    try{
      const res = await axios.post(`http://localhost:80/project_1/Dashboard/Controller/userProfileController.php`,{
        [para]:val,
        user_id: user_id
      })
      loardProfileData()
    }catch(error){
      console.error();
    }
  }

  const handleEditProfile=(para)=>{
    switch(para){
      case 'address':
        setEditDetails({
          property1:"Address",
          property2:profileDetails[0]?.Address
        })
        break;
      case 'phone':
        setEditDetails({
          property1:"PhoneNumber",
          property2:profileDetails[0]?.PhoneNumber
        })
        break;
      case 'email':
        setEditDetails({
          property1:"Email",
          property2:profileDetails[0]?.Email
        })
        break;
      default:
        break
    }
  }

  useEffect(()=>{
    loardProfileData();
  },[])

  return (
    < div className='main-dashboard'>
      <HeaderComponent />
      {!openProfile && <div className='container dashboard-outer'>
        <div className='row dashboard'>
          <div className="col-12 header">
            <h1>Control Panel</h1>
          </div>
          <div className="col-12 dashboard-btn-panel">
            <div className='row mb-4'>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/bookconer' className='btn btn-primary w-100'>Book Coner</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/memberportal' className='btn btn-primary w-100'>Member Portal</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/fundmanager' className='btn btn-primary w-100'>Fund Manager</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/userapproval' className='btn btn-primary w-100'>User Approval</Link>
              </div>
            </div>
            <div className='row mb-4'>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/viewinventory' className='btn btn-primary w-100'>View Inventory</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/ideaapproval' className='btn btn-primary w-100'>Idea Approval</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/checkin' className='btn btn-primary w-100'>Check In</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/checkout' className='btn btn-primary w-100'>Check Out</Link>
              </div>
            </div>
            <div className='row mb-4 d-flex justify-content-center'>
              <div className='col-6 col-md-3 mb-2 '>
                <button className='btn btn-primary w-100' onClick={()=>setOpenProfile(true)}>View Profile</button>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/ideaapproval' className='btn btn-secondary w-100'>Delete Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>}
      {openProfile && <div className='profile-container-outer d-flex justify-content-center'>
          <div className='profile-container-inner col-lg-7'>
          <img src="src\Images\back-btn-profile.svg" id='back-btn-profile' alt="back-btn" onClick={()=>setOpenProfile(false)} />
            <h2 className='d-flex justify-content-center mb-3'>Hello...! {profileDetails[0]?.FirstName+" "+profileDetails[0]?.LastName}</h2>
            <div className='d-flex justify-content-center'>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label className = "profile-label">User ID:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.UserID}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <label className = "profile-label">First Name:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.FirstName}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <label className = "profile-label">Last Name:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.LastName}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <label className = "profile-label">NIC Number:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.NIC}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <label className = "profile-label">Gender:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.Gender}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <label className = "profile-label">Address:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.Address
                      }
                    </td>
                    <td>
                          <img src='src\Images\edit-button-profile.svg' alt='edit btn' data-bs-toggle="modal" className="edit-btn-profile" data-bs-target="#editProfileField" onClick={()=>handleEditProfile("address")} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className = "profile-label">Phone Number:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.PhoneNumber}
                    </td>
                    <td>
                      <img src='src\Images\edit-button-profile.svg' alt='edit btn' data-bs-toggle="modal" className="edit-btn-profile" data-bs-target="#editProfileField" onClick={()=>handleEditProfile("phone")} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className = "profile-label">Birth Day:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.BirthDay
                      }
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <label className = "profile-label">Email:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.Email
                      }
                    </td>
                    <td>
                      <img src='src\Images\edit-button-profile.svg' alt='edit btn' data-bs-toggle="modal" className="edit-btn-profile" data-bs-target="#editProfileField" onClick={()=>handleEditProfile("email")} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className = "profile-label">Account Type:</label>
                    </td>
                    <td>
                      {profileDetails[0]?.AccountType}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              </div>
          </div>
        </div>
      }
      
      <div className="modal fade" id="editProfileField" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Change {editDetails["property1"]}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label>{editDetails["property1"]}:</label>
              <form>
                <input type='text' className="form-control col-lg-10" value={editDetails["property2"]} onChange={(e)=>setEditDetails((pre)=>({
                  ...pre,
                  property2:e.target.value
                }))}/>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>editProfileData(editDetails["property1"],editDetails["property2"])} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default DashBoard;
