import React, { useEffect, useState } from 'react'
import './DonateBookAdminPage.css';
import SubHeader from '../Components/SubHeader'
import { SearchDataContext } from './DonateBookPage';
import axios from 'axios';
import FooterComponent from '../Components/FooterComponent';
import DonateBookAdmin from '../Components/DonateBookAdmin';

import prevBtn from '../Images/prev-page-btn.svg';
import nextBtn from '../Images/next-page-btn.svg';
import { useNavigate } from 'react-router-dom';
import { isLibrarian, userAuthFun } from '../../../userAuthFun';

function DonationBookAdminPage() {
  const [searchData, setSearchData] = useState("");
  const [donateBookTableData, setDonateBookTableData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [isfade,setIsFade] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [requestBook, setRequestBook] = useState({});
  const [summaryReport, setSummaryReport] = useState({
    summary: [],
    totalBooks: {}
  });
  const [reportDate, setReportDate] = useState({
    from: "",
    to: ""
  });
  const navi = useNavigate();
  useEffect(() => {
    userAuthFun(navi);
  }, []);

  const onClickSetOffSet = (val) => {
    if (!(offSet === 0 && val < 0) && (donateBookTableData.length + 25 > offSet || val < 0)) {
      setOffSet(offSet + val);
    }
  }

  useEffect(() => {
    getDonateBookTableData();
  }, [searchData, offSet, refreshPage]);

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

  async function submitRequestBookDetails(data){
    try {
      const res = await axios.post(`http://localhost:80/project_1/DonationHandling/Controller/donateBookAdminPageController.php`, {
        requestBookData: data,
      });
      console.log(res)
    } catch (error) {
      
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

  function submitRequestBook(e){
    submitRequestBookDetails(requestBook)
  }



 
  return (
    <div className='main-dBookAdminPage'>
      <SearchDataContext.Provider value={{ searchData, setSearchData }}>
        <SubHeader searchBar={true} />
      </SearchDataContext.Provider>
      <div>
        <button className='btn btn-success' id="summary-btn1" data-bs-toggle="modal" data-bs-target="#summaryReport" onClick={() => {getSummaryReport(reportDate.from,reportDate.to),setIsFade(true)}}>Generate Summary Report</button>
        <button className='btn btn-secondary' id="request-books-btn" data-bs-toggle="modal" data-bs-target="#request-books" onClick={() => setIsFade(true) } disabled={!isLibrarian()}>Request Books</button>
      </div>
      <div id='donate-book-numbers'>
        <img src={prevBtn} onClick={() => onClickSetOffSet(-25)} />
        <p>Page {offSet / 25 + 1}</p>
        <img src={nextBtn} onClick={() => onClickSetOffSet(25)} />        
      </div>
      
      <div className=' dbookAdmin m-2'>
        {donateBookTableData?.slice(1).map((item, index) => (
        <DonateBookAdmin key={index} item1={item} refreshPage={()=>setRefreshPage(refreshPage? false:true)} count={index+1} ></DonateBookAdmin>                      
            ))}
      </div> 
      {isfade&&<div id='donate-fade'></div>}

      <div className="modal fade" id="summaryReport" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel" >Summary Report</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setIsFade(false)}}></button>
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
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setIsFade(false)}>Close</button>
            </div>
          </div>
        </div>
      </div> 

      <div className="modal fade" id="request-books" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Requests For Books Donations</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setIsFade(false)}></button>
            </div>
            <div className="modal-body">
              <form className="row g-3 needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="isbnNumber" className="form-label">ISBN Number</label>
                  <input type="text" className="form-control" id="isbnNumber" onChange={(e)=>setRequestBook((prev)=>({
                    ...prev,
                      isbnNumber: e.target.value
                  }))} placeholder="ISBN Number" required/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="bookName" className="form-label">Book Name</label>
                  <input type="text" className="form-control" id="bookName" onChange={(e)=>setRequestBook((prev)=>({
                    ...prev,
                      bookName: e.target.value
                  }))} placeholder="Book Name" required/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="authorName" className="form-label">Author Name</label>
                  <input type="text" className="form-control" id="authorName" onChange={(e)=>setRequestBook((prev)=>({
                    ...prev,
                      authorName: e.target.value
                  }))} placeholder="Author Name" required/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="pubName" className="form-label">Publisher Name</label>
                  <input type="text" className="form-control" id="pubName" onChange={(e)=>setRequestBook((prev)=>({
                    ...prev,
                      publisherName: e.target.value
                  }))} placeholder="Publisher Name" required/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="bookPrice" className="form-label">Book Price</label>
                  <input type="number" className="form-control" id="bookPrice" onChange={(e)=>setRequestBook((prev)=>({
                    ...prev,
                      bookPrice: e.target.value
                  }))} placeholder="Book Price" required/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input type="text" className="form-control" id="category" onChange={(e)=>setRequestBook((prev)=>({
                    ...prev,
                      category: e.target.value
                  }))} placeholder="Category" required/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">Quantity</label>
                  <input type="number" className="form-control" id="quantity" onChange={(e)=>setRequestBook((prev)=>({
                    ...prev,
                      quantity: e.target.value
                  }))} placeholder="Quantity" required/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" type="button" onClick={()=>{submitRequestBook(), setIsFade(false)}} data-bs-dismiss="modal" >Submit form</button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setIsFade(false)}>Close</button>
            </div>
          </div>
        </div>
      </div> 
      <FooterComponent />
    </div>
  )
}

export default DonationBookAdminPage;
