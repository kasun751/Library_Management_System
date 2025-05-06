import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment-timezone';
import axios from 'axios';
import { getUserType, isLibrarian, userAuthFun } from '../../../userAuthFun';
import { useNavigate } from 'react-router-dom';

const TaskModal = ({ show, handleClose, handleSave, start }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [events, setEvents] = useState([]);

  const navi = useNavigate();
  useEffect(() => {
    userAuthFun(navi);
  }, []);

  useEffect(() => {
    // Fetch events from the database when the component mounts
    axios.get('http://localhost:80/project_1/TaskPanel/fetchEvents.php')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedRoles(prevRoles => 
      checked 
        ? [...prevRoles, value] 
        : prevRoles.filter(role => role !== value)
    );
  };

  const handleSubmit = () => {
    if (title && startTime && duration && !isNaN(duration)) {
      const timeParts = startTime.split(' ');
      if (timeParts.length === 2) {
        const time = timeParts[0];
        const amPm = timeParts[1].toUpperCase();
        const [hours, minutes] = time.split(':').map(Number);

        if (!isNaN(hours) && !isNaN(minutes) && (amPm === 'AM' || amPm === 'PM')) {
          let adjustedHours = hours;
          if (amPm === 'PM' && hours < 12) {
            adjustedHours += 12;
          } else if (amPm === 'AM' && hours === 12) {
            adjustedHours = 0;
          }

          const eventStart = moment.tz(start, "Asia/Colombo");
          eventStart.set({ hour: adjustedHours, minute: minutes, second: 0, millisecond: 0 });

          const newEnd = eventStart.clone().add(duration, 'hours');
          const formattedStart = eventStart.format('YYYY-MM-DD HH:mm:ss');
          const formattedEnd = newEnd.format('YYYY-MM-DD HH:mm:ss');

          const roleString = selectedRoles.join(', ');

          handleSave({
            title,
            startTime,
            duration,
            start,
            role: roleString
          });
          handleClose();
        } else {
          alert('Invalid start time format');
        }
      } else {
        alert('Invalid start time format');
      }
    } else {
      alert('Invalid input for duration');
    }
  };

  const formattedStartDate = moment(start).format('MMMM Do YYYY');

  return (
    <>
      {getUserType() == "staff" && <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Task - {formattedStartDate}</Modal.Title>
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
              {isLibrarian() && <Form.Check 
                type="checkbox" 
                label="All" 
                value="all" 
                checked={selectedRoles.includes('all')}
                onChange={handleCheckboxChange}
              />}
              <Form.Check 
                type="checkbox" 
                label="Members" 
                value="members" 
                checked={selectedRoles.includes('members')}
                onChange={handleCheckboxChange}
              />
              {isLibrarian() && <Form.Check 
                type="checkbox" 
                label="Staff" 
                value="staff" 
                checked={selectedRoles.includes('staff')}
                onChange={handleCheckboxChange}
              />}
              {/* <Form.Check 
                type="checkbox" 
                label="Librarian" 
                value="librarian" 
                checked={selectedRoles.includes('librarian')}
                onChange={handleCheckboxChange}
              /> */}
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
      </Modal>}

      {/* Display events */}
      <div>

        <ul>
          {events?.map(event => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>Start: {event.start}</p>
              <p>End: {event.end}</p>
              <p>Role: {event.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TaskModal;