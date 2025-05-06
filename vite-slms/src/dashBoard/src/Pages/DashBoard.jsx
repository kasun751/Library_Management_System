import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, RouterProvider, useNavigate, useParams } from 'react-router-dom';
import './DashBoard.css';
import HeaderComponent from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import axios from 'axios';
import { userAuthentication } from '../App';

import editBtn from '../Images/edit-button-profile.svg'
import backBtn from '../Images/back-btn-profile.svg'
import { getUserType, isAdmin, isLibrarian, reloadApp, userAuthFun, userAuthFunDashboard } from '../../../userAuthFun';

function DashBoard() {
  const[openProfile, setOpenProfile] = useState(false);
  const parseBoolean = (value) => value === 'true';
const[openBookConer, setOpenBookConer] = useState(parseBoolean(localStorage.getItem('bookConer')));
  const[profileDetails, setProfileDetails] = useState([]);

  const {id} = useParams();
    const decodedId = decodeURIComponent(id);

    console.log(profileDetails)

    // useEffect(()=>{
    //   reloadApp();
    // },[decodedId])

  const {user_id, user_type} = useContext(userAuthentication);
  console.log(user_id)
  const [editDetails, setEditDetails] = useState({
    property1:"kasun",
    property2:""
  });
//  const navi = useNavigate();
//   useEffect(() => {
//     userAuthFun(navi);
//   }, []);

const [userDashboard, setUserDashboard] = useState();

const handleOpenBookConer = () => {
  localStorage.setItem('bookConer', true);
  setOpenBookConer(true);
};

const handleCloseBookConer = () => {
  localStorage.setItem('bookConer', false);
  setOpenBookConer(false);
};


// useEffect(() => {
//   const hasReloaded = sessionStorage.getItem('hasReloaded');

//   if (!hasReloaded || hasReloaded === 'undefined') {
//     sessionStorage.setItem('hasReloaded', 'true'); // Mark reload as done
//     window.location.reload();
//   }
// }, []);
 
  useEffect(() => {
    const checkUserDashboardStatus = async () => {
      try {
        const result = await userAuthFunDashboard();
        setUserDashboard(result); // Update state with guest status

      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkUserDashboardStatus();
  }, []); 

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

  function getSessionIdFromCookies() {
    const cookies = document.cookie.split('; ');
    const sessionCookie = cookies.find(row => row.startsWith('PHPSESSID='));
    //console.log( sessionCookie ? sessionCookie.split('=')[1] : null);
  }

  getSessionIdFromCookies();
  return (
    < div className='main-dashboard'>
      <HeaderComponent />
      {userDashboard ? (
  <h1 className="welcome-title">
    Welcome {localStorage.getItem('userID') || decodedId}
  </h1>
) : (
  <h1 className="welcome-title">
    Welcome {localStorage.getItem('guestUserName')}...
  </h1>
)}

      {!openProfile && <div className='container dashboard-outer'>
        <div className='row dashboard'>
          <div className="col-12 header">
            <h1>Control Panel</h1>
          </div>
          {userDashboard && <div className="col-12 dashboard-btn-panel">
            {!openBookConer&&<div className='row mb-4 d-flex justify-content-center'>
              {getUserType()=="staff" && <div className='col-6 col-md-3 mb-2 '>
                <Link className='btn btn-primary w-100' onClick={()=>handleOpenBookConer()}>Book Coner</Link>
              </div>}
              {getUserType()!="staff" &&<div className='col-6 col-md-3 mb-2 '>
              <Link to='/viewBook' id='dash-view-btn' className='btn btn-primary w-100'>View Books</Link>
              </div>
              
              }
              {getUserType()!="staff" &&<div className='col-6 col-md-3 mb-2 '>
              <Link to='/donation' className='btn btn-primary w-100'>Donations</Link>
              </div>              
              }
              {
                getUserType()=="reg" &&<div className='col-6 col-md-3 mb-2 '>
                <Link className='btn btn-primary w-100' id='dash-view-btn' onClick={()=>setOpenProfile(true)}>View Profile</Link>
              </div>
              }
              { getUserType()=="staff" && <div className='col-6 col-md-3 mb-2'>
                <Link to='/memberportal' className='btn btn-primary w-100'>Member Portal</Link>
              </div>}
              {getUserType()=="staff" && <div className='col-6 col-md-3 mb-2'>
                <Link to='/donation' className='btn btn-primary w-100'>Fund Manager</Link>
              </div>}
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/taskpanel' className='btn btn-primary w-100'>E-Task Panel</Link>
              </div>
            </div>}
            {!openBookConer&&<div className='row mb-4 d-flex justify-content-center'>
              {/* <div className='col-6 col-md-3 mb-2'>
                <Link to='/viewinventory' className='btn btn-primary w-100'>View Inventory</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/ideaapproval' className='btn btn-primary w-100'>Idea Approval</Link>
              </div> */}
              {getUserType()=="staff" &&<div className='col-6 col-md-3 mb-2'>
                <Link to='/checkIn' className='btn btn-primary w-100' >Check In</Link>
              </div>}
              {getUserType()=="staff" &&<div className='col-6 col-md-3 mb-2'>
                <Link to='/checkOut' className='btn btn-primary w-100'>Check Out</Link>
              </div>}
            </div>}

            {openBookConer&&<div className='row mb-4 d-flex justify-content-center'>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/addBook/addNewBook' id='dash-add-btn1' className='btn btn-primary w-100'>Add New Book</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/addBook/addExistingBookQty' id='dash-add-btn2' className='btn btn-primary w-100'>Add Book Quantity</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/addBook/addCategory' id='dash-add-btn3' className='btn btn-primary w-100 '>Add Book Category</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/addBook/availableNow' className='btn btn-primary w-100'>Available Now</Link>
              </div>
            </div>}
            {openBookConer&&<div className='row mb-4 d-flex justify-content-center'>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/modifyBook' className='btn btn-primary w-100'>Modify Book</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/deleteAllBook' id='dash-delete-btn1' className='btn btn-primary w-100'>Delete All Books</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/deleteSomeBook' id='dash-delete-btn2' className='btn btn-primary w-100'>Delete Some Books</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/searchDeleteBooks' className='btn btn-primary w-100'>Search Delete Books</Link>
              </div>
            </div>}
            {openBookConer&&<div className='row mb-4 d-flex justify-content-center'>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/viewBook' className='btn btn-primary w-100' >View Books</Link>
              </div>
              <div className='col-6 col-md-3 mb-2'>
                <Link to='/barcode' className='btn btn-primary w-100'>View Barcords</Link>
              </div>
              <div className='col-6 col-md-3 mb-2 '>
              <Link className='btn btn-primary w-100' id='dash-main-btn'  onClick={()=>handleCloseBookConer()}>Main Menu</Link>
              </div>
            </div>}

            <div className='row mb-4 d-flex justify-content-center'>
              {getUserType()=="staff" &&<div className='col-6 col-md-3 mb-2 '>
                <Link className='btn btn-primary w-100' id='dash-view-btn' onClick={()=>setOpenProfile(true)}>View Profile</Link>
              </div>}
              {(isAdmin() || isLibrarian()) && <div className='col-6 col-md-3 mb-2'>
                <Link to='/registerStaffUser' className='btn btn-secondary w-100'>Add Staff Members</Link>
              </div>}
              {/* <div className='col-6 col-md-3 mb-2'>
                <Link to='/ideaapproval' className='btn btn-secondary w-100'>Delete Account</Link>
              </div> */}
            </div>
          </div>}

          {!userDashboard && <div className="col-12 dashboard-btn-panel">
            {!openBookConer&&<div className='row mb-4 d-flex justify-content-center'>
              <div className='col-6 col-md-3 mb-2 '>
              <Link to='/viewBook' className='btn btn-primary w-100'>View Books</Link>
              </div>
            </div>}
            {!openBookConer&&<div className='row mb-4 d-flex justify-content-center'>
              <div className='col-6 col-md-3 mb-2 '>
              <Link to='/donation' className='btn btn-primary w-100'>Donations</Link>
              </div>
            </div>}

            <div className='row mb-4 d-flex justify-content-center'>
              {userDashboard && <div className='col-6 col-md-3 mb-2 '>
                <Link className='btn btn-primary w-100' id='dash-view-btn' onClick={()=>setOpenProfile(true)}>View Profile</Link>
              </div>}
              {isLibrarian() && <div className='col-6 col-md-3 mb-2'>
                <Link to='/registerStaffUser' className='btn btn-secondary w-100'>Add Staff Members</Link>
              </div>}
              {/* {userDashboard && <div className='col-6 col-md-3 mb-2'>
                <Link to='/ideaapproval' className='btn btn-secondary w-100'>Delete Account</Link>
              </div>} */}
            </div>
          </div>}

        </div>
      </div>
    }
      {openProfile && <div className="profile-container-outer d-flex justify-content-center align-items-center">
  <div className="profile-container-inner shadow-lg rounded">
    <img 
      src={backBtn} 
      id="back-btn-profile" 
      alt="back-btn" 
      className="back-button" 
      onClick={() => setOpenProfile(false)} 
    />
    <h2 className="profile-title">Hello...! {profileDetails[0]?.FirstName + " " + profileDetails[0]?.LastName}</h2>
    <div className="profile-content d-flex justify-content-center">
      <table className="profile-table">
        <tbody>
          {[
            { label: "User ID", value: profileDetails[0]?.UserID },
            { label: "First Name", value: profileDetails[0]?.FirstName },
            { label: "Last Name", value: profileDetails[0]?.LastName },
            { label: "NIC Number", value: profileDetails[0]?.NIC },
            { label: "Gender", value: profileDetails[0]?.Gender },
            { label: "Address", value: profileDetails[0]?.Address, editable: "address" },
            { label: "Phone Number", value: profileDetails[0]?.PhoneNumber, editable: "phone" },
            { label: "Birth Day", value: profileDetails[0]?.Birthday },
            { label: "Email", value: profileDetails[0]?.Email, editable: "email" },
            { label: "Account Type", value: profileDetails[0]?.AccountType }
          ].map((item, index) => (
            <tr key={index}>
              <td className="profile-label">{item.label}:</td>
              <td>{item.value}</td>
              <td>
                {item.editable && (
                  <img 
                    src={editBtn} 
                    alt="edit btn" 
                    className="edit-btn-profile" 
                    data-bs-toggle="modal" 
                    data-bs-target="#editProfileField" 
                    onClick={() => handleEditProfile(item.editable)} 
                    title="edit" 
                  />
                )}
              </td>
            </tr>
          ))}
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
