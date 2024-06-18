import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskModal = ({ show, handleClose, handleSave, start }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [role, setRole] = useState('all');

  const handleSubmit = () => {
    handleSave({ title, startTime, duration, start, role });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskTitle">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
            />
          </Form.Group>
          <Form.Group controlId="formStartTime">
            <Form.Label>Start Time (HH:MM AM/PM format)</Form.Label>
            <Form.Control
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Enter start time"
            />
          </Form.Group>
          <Form.Group controlId="formDuration">
            <Form.Label>Duration (hours)</Form.Label>
            <Form.Control
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration"
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>Select Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="all">All</option>
              <option value="members">Members</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
