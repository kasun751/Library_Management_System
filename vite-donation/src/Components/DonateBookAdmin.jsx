import React from 'react';
import Card from 'react-bootstrap/Card';

function DonateBookAdmin({item1, count}) {
     {console.log(count,'==>',item1)}
  return (
    <div className='m-2'>
         <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{item1[0]?.BookName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item1[0]?.ISBN_Number}</Card.Subtitle>
                <Card.Text>
                Requied: {item1[0]?.quantity} Recieved {item1[0]?.received_qty}
                </Card.Text>
                <Card.Text>
                Author name: {item1[0]?.AuthorName} Publisher name: {item1[0]?.PublishName} Book Price: {item1[0]?.BookPrice}
                </Card.Text>
                <Card.Link >
                    <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target={`#donationsInfo${count}`}>Details</button>
                </Card.Link>
            </Card.Body>
        </Card>
        <div className="modal fade" id={`donationsInfo${count}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
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
                            </tr>
                        </thead>
                        <tbody>
                            {item1?.map((item, index) => (
                            <tr key={index}>
                                {/* {console.log(index,'=>',item)} */}
                                <th scope="row">{index + 1}</th>
                                <td>{item?.donator_id}</td>
                                <td>{item?.no_of_books}</td>
                                <td>{item?.firstName}</td>
                                <td>{item?.email}</td>
                                <td>{item?.phoneNum}</td>
                                <td>{item?.address}</td>
                                <td>{item?.city}</td>
                                <td>{item?.country}</td>
                                <td>{item?.time_stamp}</td>
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