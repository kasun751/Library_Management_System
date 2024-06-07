import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './ReportTable.css'

function ReportTable(props) {
    const [records, setRecords] = useState([]);

    useEffect(()=>{
        getPostRecords()
    },[]);

    async function getPostRecords(){
        try{
            const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/User-reportPostManager.php?post_id=${props.post_id}`);
            setRecords(res.data);
        }catch (err) {
            console.error(err);
        }
    }
  return (
    <>
        <div className='Report-table-container'>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Post ID</th>
                            <th>Reported User</th>
                            <th>Reason for Reporting</th>
                            <th>Reported TimeSlap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((item,index)=>(
                            <tr key={item.report_post_id}>
                                <td>{item.report_post_id}</td>
                                <td>{item.post_id}</td>
                                <td>{item.reported_user}</td>
                                <td>{item.reason_reported}</td>
                                <td>{item.report_create_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default ReportTable