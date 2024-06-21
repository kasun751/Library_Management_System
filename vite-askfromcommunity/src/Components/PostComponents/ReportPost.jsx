import React, { useState } from 'react'
import './ReportPost.css';
import ReportPage from '../ReportComponent/ReportPage';
import { AnimatePresence, motion } from 'framer-motion';

function ReportPost({ post }) {
    const [showDescription, setShowDescription] = useState(false);
    const [openReportPage, setOpenReportPage] = useState(false);


  return (
    <>
        <div className='reportPost-container'>            
            <div>
              <button onClick={()=>setOpenReportPage(openReportPage?false:true)}>View Report Details</button>
              <h2>{post.title}</h2>
              <h4 onClick={()=>setShowDescription(showDescription?false:true)}>Description</h4>
              {showDescription && <p>{post.description}</p>}
            </div>
        </div>
        <AnimatePresence>
        
        {openReportPage&&<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReportPage item={post} status={"post"}/>
            </motion.div>
            }
        
        </AnimatePresence>
    </>    
  )
}

export default ReportPost