import React, { useEffect, useState } from 'react'
import './DonateFundsAdminPage.css';
import SubHeader from '../Components/SubHeader'
import { SearchDataContext } from './DonateBookPage';
import axios from 'axios';

function DonationFundsAdminPage() {
    const [searchData, setSearchData] = useState("");
    const [donateFundsTableData, setDonateFundsTableData] = useState();
    const [offSet, setOffSet] = useState(0);
    const [itemData, setItemData] = useState({});

    const [summaryReport, setSummaryReport] = useState({
        summary: [],
        totalFunds: {}
      });
      const [reportDate, setReportDate] = useState({
        from: "",
        to: ""
      });

    const onClickSetOffSet=(val)=>{
      if(offSet==0&&val<0){
      }else{
        if(donateFundsTableData.length+5>offSet || val<0)
        setOffSet(offSet+val);
      }
    }

    useEffect(()=>{
      getdonateFundsTableData();
    },[searchData,offSet])

    useEffect(()=>{
      getSummaryReport(reportDate.from,reportDate.to);
    },[reportDate.to])

  async function getdonateFundsTableData(){
    try {
      const res = await axios.get(`http://localhost:80/project_1/DonationHandling/Controller/donateFundsAdminPageController.php?search=${searchData}&offset=${offSet}`);
      setDonateFundsTableData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getSummaryReport(fromDate,toDate) {
    try {
        console.log(fromDate)
        console.log(toDate)
      const res1 = await axios.get(`http://localhost:80/project_1/DonationHandling/Controller/summaryFundReportController.php?fromDate=${fromDate}&toDate=${toDate}&summary=ok`);
      setSummaryReport(prevState => ({
        ...prevState,
        summary: res1.data,
      }));

      const res2 = await axios.get(`http://localhost:80/project_1/DonationHandling/Controller/summaryFundReportController.php?fromDate=${fromDate}&toDate=${toDate}&summary=no`);
      setSummaryReport(prevState => ({
        ...prevState,
        totalFunds: res2.data
      }));
      console.log(summaryReport.totalFunds)
      console.log(summaryReport.summary)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
        <SearchDataContext.Provider value={{searchData, setSearchData}}>
            <SubHeader searchBar={true} />
        </SearchDataContext.Provider>
        <div id='donate-funds-numbers'>
              <img src="src\Images\prev-page-btn.svg" onClick={()=>onClickSetOffSet(-5)} />
              <p>Page {offSet/5+1}</p>
              <img src="src\Images\next-page-btn.svg" onClick={()=>onClickSetOffSet(5)} />
        </div>
        <button className='btn btn-success' id="summary-btn" data-bs-toggle="modal" data-bs-target="#summaryReport" onClick={() => getSummaryReport(reportDate.from,reportDate.to)}>Generate Summary Report</button>
        <div className='table-responsive'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Purpose</th>
                <th scope="col">Amount</th>
                <th scope="col">Donator ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {donateFundsTableData?.map((item,index)=>(
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{item.purpose}</td>
                  <td>Rs.{item.amount}</td>
                  <td>{item.donator_id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNum}</td>
                  <td>
                    <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#donatorInfo" onClick={()=>setItemData(item)}>More info</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal fade" id="donatorInfo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{itemData.firstName+" "+itemData.lastName}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p><b>Purpose: </b>{itemData.purpose}</p>
                <p><b>Amount: </b>Rs.{itemData.amount}</p>
                <p><b>Donator ID: </b>{itemData.donator_id}</p>
                <p><b>Email: </b>{itemData.email}</p>
                <p><b>Phone number: </b>{itemData.phoneNum}</p>
                <p><b>Address: </b>{itemData.address}</p>
                <p><b>City: </b>{itemData.city}</p>
                <p><b>Country: </b>{itemData.country}</p>
                <p><b>time Stamp: </b>{itemData.time_stamp}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
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
                    <th scope="col">Purpose</th>
                    <th scope="col">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryReport?.summary?.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.purpose}</td>
                      <td>Rs.{item.purposeAmount}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4}></td>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Sub Total</th>
                  </tr>
                  <tr>
                    <th></th>
                    <td>Rs.{summaryReport?.totalFunds[0]?.subTotal}</td>
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
    </>
  )
}

export default DonationFundsAdminPage