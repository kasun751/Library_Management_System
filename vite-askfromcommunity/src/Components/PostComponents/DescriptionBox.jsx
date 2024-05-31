import React, { useState } from 'react'

function DescriptionBox(props) {
    const [openDescription, setOpenDescription] = useState(false);

    const handleOpenDescription =()=>{
        setOpenDescription(openDescription? false:true);
    }
  return (
    <div>
        <div className='descriptionBoxComponent'>
            <p onClick={handleOpenDescription}>Description</p>
        </div>
        {openDescription&&<div className='descriptionBoxComponent-2'>
            <p>{props.description}</p>
        </div>}
    </div>
  )
}

export default DescriptionBox