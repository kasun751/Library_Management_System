import React, { useEffect, useState } from 'react'
import './DonateBookAdminPage.css';
import SubHeader from '../Components/SubHeader'
import { SearchDataContext } from './DonateBookPage';
import axios from 'axios';
import FooterComponent from '../Components/FooterComponent';
import DonateBookAdmin from '../Components/DonateBookAdmin';

function DonationBookAdminPage() {
  const [searchData, setSearchData] = useState("");
  const [donateBookTableData, setDonateBookTableData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [itemData, setItemData] = useState({});
  const [summaryReport, setSummaryReport] = useState({
    summary: [],
    totalBooks: {}
  });
  const [reportDate, setReportDate] = useState({
    from: "",
    to: ""
  });

  const onClickSetOffSet = (val) => {
    if (!(offSet === 0 && val < 0) && (donateBookTableData.length + 25 > offSet || val < 0)) {
      setOffSet(offSet + val);
    }
  }

  useEffect(() => {
    getDonateBookTableData();
  }, [searchData, offSet]);

  useEffect(()=>{
    getSummaryReport(reportDate.from,reportDate.to);
  },[reportDate.to])

  async function getDonateBookTableData() {
    try {
      const res = await axios.get(`http://localhost:80/project_1/DonationHandling/Controller/donateBookAdminPageController.php?search=${searchData}&offset=${offSet}`);
      const result = res.data;
      console.log(result)
      setDonateBookTableData(result);      
    } catch (error) {
      console.error(error);
    }
  }

  async function getSummaryReport(fromDate,toDate) {
    try {
      const res1 = await axios.get(`http://localhost:80/project_1/DonationHandling/Controller/summaryBookReportController.php?fromDate=${fromDate}&toDate=${toDate}&summary=ok`);
      setSummaryReport(prevState => ({
        ...prevState,
        summary: res1.data,
      }));

      const res2 = await axios.get(`http://localhost:80/project_1/DonationHandling/Controller/summaryBookReportController.php?fromDate=${fromDate}&toDate=${toDate}&summary=no`);
      setSummaryReport(prevState => ({
        ...prevState,
        totalBooks: res2.data
      }));
      console.log(summaryReport.totalBooks[0])
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SearchDataContext.Provider value={{ searchData, setSearchData }}>
        <SubHeader searchBar={true} />
      </SearchDataContext.Provider>
      <div id='donate-book-numbers'>
        <img src="src\Images\prev-page-btn.svg" onClick={() => onClickSetOffSet(-25)} />
        <p>Page {offSet / 25 + 1}</p>
        <img src="src\Images\next-page-btn.svg" onClick={() => onClickSetOffSet(25)} />
      </div>
      <button className='btn btn-success' id="summary-btn" data-bs-toggle="modal" data-bs-target="#summaryReport" onClick={() => getSummaryReport(reportDate.from,reportDate.to)}>Generate Summary Report</button>
      <button className='btn btn-success' id="request-books-btn" data-bs-toggle="modal" data-bs-target="#request-books" onClick={() => getSummaryReport(reportDate.from,reportDate.to)}>Request Books</button>
      <div className='d-flex justify-content-center m-2'>
        {donateBookTableData?.map((item, index) => (
        <DonateBookAdmin key={index} item1={item} count={index+1} >{console.log("hello",item)}  </DonateBookAdmin>                      
            ))}
      </div>
      
      {/* <div className='table-responsive'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ISBN Number</th>
              <th scope="col">No.of Books</th>
              <th scope="col">Donator ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {donateBookTableData?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.ISBN_Number}</td>
                <td>{item.no_of_books}</td>
                <td>{item.donator_id}</td>
                <td>{item.firstName}</td>
                <td>{item.email}</td>
                <td>{item.phoneNum}</td>
                <td>
                  <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#donatorInfo" onClick={() => setItemData(item)}>More info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
       {/* <div className="modal fade" id="donatorInfo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{itemData.firstName + " " + itemData.lastName}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p><b>ISBN Number: </b>{itemData.ISBN_Number}</p>
              <p><b>No.Of Books: </b>{itemData.no_of_books}</p>
              <p><b>Unit Price: </b>{parseFloat(itemData.total_price) / parseInt(itemData.no_of_books)}</p>
              <p><b>Total price: </b>{itemData.total_price}</p>
              <p><b>Donator ID: </b>{itemData.donator_id}</p>
              <p><b>Email: </b>{itemData.email}</p>
              <p><b>Phone number: </b>{itemData.phoneNum}</p>
              <p><b>Address: </b>{itemData.address}</p>
              <p><b>City: </b>{itemData.city}</p>
              <p><b>Country: </b>{itemData.country}</p>
              <p><b>Time Stamp: </b>{itemData.time_stamp}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="modal fade" id="summaryReport" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Summary Report</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                      <th>
                          From
                      </th>
                      <th>
                          To
                      </th>
                      <td></td>
                  </tr>
                  <tr>
                      <td>
                          <input type='date' className="form-control" value={reportDate.from} onChange={(e)=>setReportDate(prev => ({ ...prev, from: e.target.value }))} />
                      </td>
                      <td>
                          <input type='date' className="form-control" value={reportDate.to} onChange={(e)=>setReportDate(prev => ({ ...prev, to: e.target.value }))} />
                      </td>
                      <td>
                        <button className='btn btn-primary' onClick={()=>setReportDate(prev => ({ ...prev,
                             from: "" ,
                             to: "" 
                             }))} >Clear</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ISBN Number</th>
                    <th scope="col">No.of Books</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryReport?.summary?.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.ISBN_Number}</td>
                      <td>{item.total_count}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4}></td>
                  </tr>
                  <tr>
                    <th></th>
                    <th>No.of Book Types</th>
                    <th>No.of Books</th>
                  </tr>
                  <tr>
                    <th></th>
                    <td>{summaryReport?.totalBooks[0]?.no_of_types}</td>
                    <td>{summaryReport?.totalBooks[0]?.no_of_books}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> 
      <div className="modal fade" id="request-books" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Requests For Books Donations</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div class="mb-3">
                <label for="isbnNumber" class="form-label">ISBN Number</label>
                <input type="text" class="form-control" id="isbnNumber" placeholder="ISBN Number" />
              </div>
              <div class="mb-3">
                <label for="bookName" class="form-label">Book Name</label>
                <input type="text" class="form-control" id="bookName" placeholder="Book Name" />
              </div>
              <div class="mb-3">
                <label for="authorName" class="form-label">Author Name</label>
                <input type="text" class="form-control" id="authorName" placeholder="Author Name" />
              </div>
              <div class="mb-3">
                <label for="pubName" class="form-label">Publisher Name</label>
                <input type="text" class="form-control" id="pubName" placeholder="Publisher Name" />
              </div>
              <div class="mb-3">
                <label for="bookPrice" class="form-label">Book Price</label>
                <input type="number" class="form-control" id="bookPrice" placeholder="Book Price" />
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <input type="text" class="form-control" id="category" placeholder="Category" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> 
      <FooterComponent />
    </>
  )
}

export default DonationBookAdminPage;
