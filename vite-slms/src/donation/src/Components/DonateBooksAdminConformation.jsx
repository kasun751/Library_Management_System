import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DonateConformation.css';

const DonateBooksAdminConformation = ({onClickConfirm, onClickCloseConfirmation, action}) => {

    const[qty,setQty] = useState(0);
    const[check,setCheck] = useState(false);

  return (
    <> 
        {
            action==-2 && <div
            id='donate-confirmation'
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Confirmation...!</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>Enter Submited Book Quantity and Confirm...!!!</p>
              <input type='number'value = {qty} onChange={(e)=>setQty(e.target.value)} />

              <p>
                Submite Book Amount: &nbsp;{qty} <br />
                Confirm: &nbsp;
                <input type='checkbox' checked={check} onChange={(e)=>setCheck(check? false:true)} />
              </p>
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="secondary" onClick={onClickCloseConfirmation}>Close</Button>
              <Button variant="primary" onClick={()=>{onClickConfirm(qty),onClickCloseConfirmation()}} disabled={!check || qty <= 0}>Confirm Donation</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
        }
        {
            action==-3 && <div
            id='donate-confirmation'
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Confirmation...!</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>Do You Want to Reject the Donation...?</p>
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="secondary" onClick={onClickCloseConfirmation}>Cancel</Button>
              <Button variant="primary" onClick={()=>onClickConfirm(0)}>Confirm Donation</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
        }
    </>
  )
}

export default DonateBooksAdminConformation