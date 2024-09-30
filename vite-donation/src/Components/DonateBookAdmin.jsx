import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './DonateBookAdmin.css'
import DonateBooksAdminConformation from './DonateBooksAdminConformation';
import axios from 'axios';

function DonateBookAdmin({item1, count, refreshPage}) {

  const [adminConfirmation,setAdminConfirmation] = useState(false);
  const [donatorID,setDonatorID] = useState("");
  const [action,setAction] = useState(0);

  function changeRowColor(item){
    let sty = {}
    if(item == -1){
      //pending
      sty = { backgroundColor: 'rgba(0,0,0,0.3)' };
    }else if(item==-2){
      //accept
      sty = { backgroundColor: 'rgba(0,255,0,0.3)' };
    }else if(item==-3){
      //reject
      sty = { backgroundColor: 'rgba(255,0,0,0.3)' };
    }
    return sty;
  }

  async function onClickAction(submitQty){
    try {
      const res = await axios.post(`http://localhost:80/project_1/DonationHandling/Controller/donateBookAdminPageController.php`, {
        donatorID: donatorID,
        actionID: action,
        submitQty: submitQty,
      });
      setAdminConfirmation(false);
      refreshPage();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='m-2'>
         <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title><h5 style={{width:'220px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item1[0]?.bookName}</h5></Card.Title>
                
                <Card.Text style={{ display:'flex', justifyContent:'center' }}>
                <span className='req-field'><b>Requied:</b> &nbsp; {item1[0]?.quantity}</span> <span className='rec-field'><b>Recieved:</b>&nbsp; {item1[0]?.received_qty}</span>
                </Card.Text>
                <Card.Subtitle  className="mb-2 text-muted">ISBN <b>Number:</b>&nbsp; {item1[0]?.ISBN_Number}</Card.Subtitle>
                <Card.Text>
                  <b>Author name:</b>&nbsp; {item1[0]?.authorName}
                </Card.Text>
                <Card.Text>
                   <b>Publisher name:</b>&nbsp; {item1[0]?.publisherName}
                </Card.Text>
                <Card.Text>
                  <b>Book Price:</b>&nbsp; {item1[0]?.bookPrice}
                </Card.Text>
                <Card.Link >
                    <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target={`#donationsInfo${count}`}>Details</button>
                </Card.Link>
            </Card.Body>
        </Card>

        {adminConfirmation && <div id='donate-books-ad'><DonateBooksAdminConformation onClickConfirm={onClickAction} onClickCloseConfirmation={()=>setAdminConfirmation(false)} action={action}/> </div>}

        <div className="modal fade" id={`donationsInfo${count}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">ISBN Number: &nbsp;{item1[0]?.ISBN_Number}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className='table-responsive'>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Donator ID</th>
                            <th scope="col">No.of Books</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">Country</th>
                            <th scope="col">Time Stamp</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {item1?.map((item, index) => (
                            <tr key={index}>
                                <th scope="row" style={changeRowColor(item?.total_price)}>{index + 1}</th>
                                <td style={changeRowColor(item?.total_price)}>{item?.donator_id}</td>
                                <td style={changeRowColor(item?.total_price)}>{item?.no_of_books}</td>
                                <td style={changeRowColor(item?.total_price)}>{item?.firstName}</td>
                                <td style={changeRowColor(item?.total_price)}>{item?.email}</td>
                                <td style={changeRowColor(item?.total_price)}>{item?.phoneNum}</td>
                                <td style={changeRowColor(item?.total_price)}>{item?.address}</td>
                                <td style={changeRowColor(item?.total_price)}>{item?.city}</td>
                                <td style={changeRowColor(item?.total_price)}>{item?.country}</td>
                                <td style={changeRowColor(item?.total_price)}>{item?.time_stamp}</td>
                                {
                                item?.total_price==-1 && 
                                <td style={changeRowColor(item?.total_price)}>
                                  <button className='btn btn-primary' onClick={()=>{setDonatorID(item?.donator_id),setAction(-2), setAdminConfirmation(true)}}>Accept</button>
                                  </td>
                                }
                                {
                                item?.total_price==-1 && 
                                <td style={changeRowColor(item?.total_price)}>
                                  <button className='btn btn-outline-danger' onClick={()=>{setDonatorID(item?.donator_id),setAction(-3), setAdminConfirmation(true)}}>Reject</button>
                                  </td>
                                }
                                {
                                item?.total_price==-2 && 
                                <td style={changeRowColor(item?.total_price)}><label style={{color:'green',fontSize:'15px'}}>Accepted</label></td>
                                }
                                {
                                item?.total_price==-3 && 
                                <td style={changeRowColor(item?.total_price)}><label style={{color:'red',fontSize:'15px'}}>Rejected</label></td>
                                }
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default DonateBookAdmin