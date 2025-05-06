import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DonateConformation.css';

const DonateConformation = ({onClickConfirm, onClickCloseConfirmation}) => {
    console.log("hello")
  return (
    <div
        id='donate-confirmation'
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header> 

        <Modal.Body>
          <p>Confirm your Donation....!!!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClickCloseConfirmation}>Close</Button>
          <Button variant="primary" onClick={onClickConfirm}>Confirm Donation</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}

export default DonateConformation