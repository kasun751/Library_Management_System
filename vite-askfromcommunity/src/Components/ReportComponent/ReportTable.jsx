import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './ReportTable.css'

function ReportTable(props) {
    const [records, setRecords] = useState([]);

    useEffect(()=>{
        getPostRecords()
    },[]);
    async function getPostRecords(){
        
        try{ //ok
            if(props.status=="post"){
                const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/reportPostController.php?post_id=${props.post_id}`);
                setRecords(res.data);
            }else{ //ok
                const res = await axios.get(`http://localhost:80/project_1/AskFromCommunity/Controller/reportReplyMsgController.php?post_id=${props.post_id}&reply_id=${props.reply_id}&table_data=ok`);
                setRecords(res.data);
            }            
            
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
                            <th>{props.status=="post"?"Post ID":"Reply ID"}</th>
                            <th>{props.status=="post"?"Post Owner":"Reply Owner"}</th>
                            <th>Reported User</th>
                            <th>Reason for Reporting</th>
                            <th>Reported TimeSlap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((item)=>(
                            <tr key={props.status=="post"?item.report_post_id:item.report_reply_id}>
                                <td>{props.status=="post"?item.report_post_id:item.report_reply_id}</td>
                                <td>{props.status=="post"?item.post_id:item.reply_id}</td>
                                <td>{props.user_id}</td>
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