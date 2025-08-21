import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DonateConformation.css';

const DonateBookPaymentConformation = ({onClickConfirm, onClickCloseConfirmation}) => {
    console.log("hello")
  return (
    <div
        id='donate-confirmation'
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    > 
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here Book Payment.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClickCloseConfirmation}>Close</Button>
          <Button variant="primary" onClick={()=>{onClickConfirm(),onClickCloseConfirmation()}}>Confirm Donation</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}

export default DonateBookPaymentConformation