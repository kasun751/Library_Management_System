import React, { useEffect, useRef, useState, useContext } from 'react';
import './ReportComponent.css';
import closeBtn from '../../Images/close-btn.svg';
import axios from 'axios';
import { userAuthentication } from '../../App';

function ReportComponent({ onClose, post_id, openFeild1, reportType, reply_id  } ) {
  const [reason, setReason] = useState('');
  const selectRef = useRef('');
  const [submit, setSubmit] = useState(false);
  const [Select, setSelect] = useState(false);
  const [openFeild, setOpenFeild] = useState(openFeild1);

  const {user_id, user_type} = useContext(userAuthentication)
 
  useEffect(() => {
    selectRef.current.focus();
  }, []);

  async function handleRecordReportData(reportReason){
    try{ //ok
      if(reportType=="post"){
        await axios.post(`http://localhost:80/project_1/AskFromCommunity/Controller/reportPostController.php`,{
          user_id:user_id,
          post_id:post_id,
          reason:reportReason,
        });
      }else{ //ok
        const res = await axios.post(`http://localhost:80/project_1/AskFromCommunity/Controller/reportReplyMsgController.php`,{
          user_id:user_id,
          post_id:post_id,
          reply_id:reply_id,
          reason:reportReason,
        });
      }
    }catch(err){
      console.error(err);
    }
  }

  const handleSubmit = () => {    
    if (reason !== '') {
      handleRecordReportData(reason);
      onClose();
      setSubmit(true);     
      } else {
      setSubmit(false);
      setSelect(true);
    }
    setReason('');
  };

  return (
    <div className='main-reportComponent'>
      {openFeild&&<div className={submit ? 'report-containerOuter click' : 'report-containerOuter'}>
      <div className={submit ? 'container report-container click col-md-5' : 'container report-container col-md-5 col-lg-3'}>
        <img src={closeBtn} onClick={()=>setOpenFeild(false)} alt='close' />
        <h4>This content has</h4>
        <select
          ref={selectRef}
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">Select a reason</option>
          <option value="Spam or Advertisement">Spam or Advertisement</option>
          <option value="Abusive or Harassing Content">Abusive or Harassing Content</option>
          <option value="Offensive Content">Offensive Content</option>
          <option value="Misinformation or False Information">Misinformation or False Information</option>
          <option value="Violating Community Guidelines">Violating Community Guidelines</option>
          <option value="Copyright Infringement">Copyright Infringement</option>
          <option value="Graphic or Disturbing Content">Graphic or Disturbing Content</option>
          <option value="Privacy Violation">Privacy Violation</option>
          <option value="Off-Topic or Irrelevant Content">Off-Topic or Irrelevant Content</option>
          <option value="Duplicate Content">Duplicate Content</option>
          <option value="other">Other</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
        {Select && <p>Please Select a reason for reporting</p>}
      </div>
    </div>}
    </div>
  );
}

export default ReportComponent;
