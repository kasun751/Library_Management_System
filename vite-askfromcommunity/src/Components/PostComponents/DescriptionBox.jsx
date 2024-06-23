import React, { useState } from 'react'
import './DescriptionBox.css'

function DescriptionBox(props) {
    const [openDescription, setOpenDescription] = useState(false);

    const handleOpenDescription = () => {
        setOpenDescription(prevState => !prevState);
    }

    return (
        <div>
            <div className='descriptionBox' onClick={handleOpenDescription}>
                <h4>Description</h4>
            </div>
            <div className={`descriptionBox ${openDescription ? 'show' : 'hide'}`}>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default DescriptionBox
