import React, { useContext, useEffect, useState } from 'react';
import './BodyComponent.css';
import axios from 'axios';
import { userAuthentication, userSearch } from '../App';
import HeaderComponent from './HeaderComponent';

function BodyComponent() {
    const {searchData, filter} = useContext(userSearch)
    const {current_user_id, current_user_type} = useContext(userAuthentication);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offSet, setOffSet] = useState(0);
    const [summaryData, setSummaryData] = useState({
        totalMembers:"",
        restrictedMembers:"",
        staffMembers:""
    });
    const [formData, setFormData] = useState({
        user_id:"",
        firstName:"",
        lastName:"",
        nic:"",
        gender:"",
        address:"",
        phoneNumber:"",
        birthDay:"",
        email:"",
        reason:"",
        account_status:"",
    })
    const [restrictedUserDetails, setRestrictedUserDetails] = useState({
        restricted_reason:""
    });
    useEffect(() => {
        getTableData(searchData, filter, offSet);
    }, [searchData, filter, offSet]);

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const onClickSetOffSet=(val)=>{
        if(offSet==0&&val<0){
        }else{
          if(tableData.length+5>offSet || val<0)
          setOffSet(offSet+val);
        }
      }

    const renderAccountStatus = (status) => {
        switch(status) {
            case '0':
                return 'Not Activate';
            case '1':
                return 'Active';
            case '2':
                return 'Restricted';
            default:
                return 'Unknown';
        }
    };

    async function handleGetRestrictedDetails(user_id){
        try {
            const res = await axios.get(`http://localhost:80/project_1/MemberManagement/Controller/restrictedMemberController.php?user_id=${user_id}`);
            setRestrictedUserDetails(res.data[0]);
        } catch (error) {
            console.log(error)
        }
    }
    async function handleGetSummaryData(){
        try {
            const res = await axios.get(`http://localhost:80/project_1/MemberManagement/Controller/summaryController.php`);
            setSummaryData(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    async function handleRestrict(user_id,reason){
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:80/project_1/MemberManagement/Controller/restrictedMemberController.php`,{
                ...formData,
                user_id:user_id,
                current_user:current_user_id,
                reason:reason
            });
            getTableData(searchData, filter, offSet);
        } catch (error) {
            console.error('Error fetching table data:', error);
        }finally {
            setLoading(false);
          }
    }
    async function handleRemoveRestrict(user_id){
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:80/project_1/MemberManagement/Controller/restrictedMemberController.php`,{
                ...formData,
                user_id:user_id,
                current_user:current_user_id,
            });
            getTableData(searchData, filter, offSet);
        } catch (error) {
            console.error('Error fetching table data:', error);
        }finally {
            setLoading(false);
          }
    }

    async function updateUserInfo(user_id){
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:80/project_1/MemberManagement/Controller/memberManagementController.php`,{
                ...formData,
                user_id:user_id
            });
            getTableData(searchData, filter, offSet);
        } catch (error) {
            console.error('Error fetching table data:', error);
        }finally {
            setLoading(false);
          }
    }

    async function handleDelete(user_id){
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:80/project_1/MemberManagement/Controller/memberManagementController.php`,{
                delete_user:user_id
            });
            getTableData(searchData, filter, offSet);
        } catch (error) {
            console.error('Error fetching table data:', error);
        }finally {
            setLoading(false);
          }
    }

    async function loadFromData(user_id){
        try {
            const res = await axios.get(`http://localhost:80/project_1/MemberManagement/Controller/memberManagementController.php?user_id=${user_id}`);
            setFormData({
                user_id:user_id,
                firstName:res.data[0].FirstName || "",
                lastName:res.data[0].LastName || "",
                nic:res.data[0].NIC || "",
                gender:res.data[0].Gender || "",
                address:res.data[0].Address || "",
                phoneNumber:res.data[0].PhoneNumber || "",
                birthDay:res.data[0].BirthDay || "",
                email:res.data[0].Email || "",
                account_status:res.data[0].Account_Status || "",
                account_type:res.data[0].AccountType || "",
            });
            if(res.data[0].Account_Status==2){
                handleGetRestrictedDetails(user_id);
                
            }
        } catch (error) {
            console.error('Error fetching table data:', error);
        }
    }

    async function getTableData(searchData, filter) {
        try {
            const res = await axios.get(`http://localhost:80/project_1/MemberManagement/Controller/memberManagementController.php?search=${searchData}&filter=${filter}&offset=${offSet}`);
            setTableData(res.data);
        } catch (error) {
            console.error('Error fetching table data:', error);
        }
    }

    return (
        <>
            <HeaderComponent onclick={onClickSetOffSet}/>
            <button className='btn btn-primary summary-btn' data-bs-toggle="modal" data-bs-target="#summaryReport" onClick={()=>handleGetSummaryData()} >Summary</button>
            <div className='table-responsive'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">NIC</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.UserID}</td>
                                <td>{item.FirstName}</td>
                                <td>{item.LastName}</td>
                                <td>{item.NIC}</td>
                                <td>{item.Email}</td> 
                                <td>{item.PhoneNumber}</td> 
                                <td className='btn-group'>
                                    <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editFormModel" onClick={()=>loadFromData(item.UserID)} disabled={loading}>Edit</button>
                                    <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#viewMoreDetails" onClick={()=>loadFromData(item.UserID)}disabled={loading}>More...</button>
                                    <button className={item.Account_Status!=2?"btn btn-outline-warning":"btn btn-warning"} data-bs-toggle="modal" data-bs-target={item.Account_Status!=2?"#restrictedReason":"#removeRestriction"} onClick={()=>loadFromData(item.UserID)} disabled={loading}>{item.Account_Status!=2?"Restrict__":"Restricted"}</button>
                                    <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#confirmDelete" onClick={()=>loadFromData(item.UserID)}disabled={loading}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                <div className="modal fade" id="editFormModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Member Details</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className=''>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name"/>
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" name="nic" value={formData.nic} onChange={handleChange} placeholder="NIC" />
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="tel" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone number" />
                                        </div>
                                        <div className="col">
                                            <input type="date" className="form-control" name="birthDay" value={formData.birthDay} onChange={handleChange} placeholder="Birthday" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>updateUserInfo(formData.user_id)}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
             {
                <div className="modal fade" id="viewMoreDetails" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Member Details</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p><b>User ID:</b> {formData.user_id}</p><b></b>
                                <p><b>First Name:</b> {formData.firstName}</p>
                                <p><b>Last Name:</b> {formData.lastName}</p>
                                <p><b>NIC number:</b> {formData.nic}</p>
                                <p><b>Gender:</b> {formData.gender}</p>
                                <p><b>Address:</b> {formData.address}</p>
                                <p><b>Phone number:</b> {formData.phoneNumber}</p>
                                <p><b>Birth Day:</b> {formData.birthDay}</p>
                                <p><b>Email:</b> {formData.email}</p>
                                <p><b>Account Type:</b> {formData.account_type}</p>
                                <p><b>Account Status:</b> {renderAccountStatus(formData.account_status)}</p>
                                {(formData.account_status==2)&&<hr />}
                                {(formData.account_status==2)&&<p><b>Restricted reason:  </b>{restrictedUserDetails.restricted_reason}</p>}
                                {(formData.account_status==2)&&<p><b>Restricted By(staff):  </b>{restrictedUserDetails.restricted_by}</p>}
                                {(formData.account_status==2)&&<p><b>Restricted TimeStamp:  </b>{restrictedUserDetails.restricted_time}</p>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                <div className="modal fade" id="restrictedReason" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Reason For Restrict</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row mb-3">
                                        <div className="col">
                                        <select className="form-select" name="reason" onChange={handleChange}>
                                            <option value="" >Open this select menu</option>
                                            <option value="Violation of Terms of Service">Violation of Terms of Service</option>
                                            <option value="Suspicious Activity">Suspicious Activity</option>
                                            <option value="Security Concerns">Security Concerns</option>
                                            <option value="Spam or Fraud">Spam or Fraud</option>
                                            <option value="Non-Payment or Billing Issues">Non-Payment or Billing Issues</option>
                                            <option value="Abuse or Harassment">Abuse or Harassment</option>
                                            <option value="Intellectual Property Violations">Intellectual Property Violations</option>
                                            <option value="Creating Multiple Accounts">Creating Multiple Accounts</option>
                                            <option value="Illegal Activities">Illegal Activities</option>
                                            <option value="Data Privacy Violations">Data Privacy Violations</option>
                                            <option value="Inactivity">Inactivity</option>
                                            <option value="Misinformation">Misinformation</option>
                                            <option value="Resource Abuse">Resource Abuse</option>
                                        </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={()=>handleRestrict(formData.user_id,formData.reason)}>Restrict</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                <div className="modal fade" id="removeRestriction" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Remove Restrictions</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h3>Are you Want to Remove Restrictions</h3>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={()=>handleRemoveRestrict(formData.user_id)}>Remove Restrictions</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                <div className="modal fade" id="confirmDelete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">User Account Delete</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h3>Are You Want to delete</h3>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>handleDelete(formData.user_id)}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                <div className="modal fade" id="summaryReport" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Summary</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>
                                                Total number of members :{
                                                    summaryData && summaryData.totalMembers
                                                }
                                            </th>
                                            <td>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Total number of Resticted members :{
                                                    summaryData && summaryData.restrictedMembers
                                                }
                                            </th>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Total number of staff members :{
                                                    summaryData && summaryData.staffMembers
                                                }
                                            </th>
                                            <td>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default BodyComponent;
