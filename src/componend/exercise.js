//app.js

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskModal from './componend/TaskModal';
import ConfirmModal from './componend/ConfirmModal';

const localizer = momentLocalizer(moment);

const App = () => {
  const [events, setEvents] = useState([
    {
      title: 'Library Opening Ceremony',
      start: new Date(2024, 5, 25, 9, 0),
      end: new Date(2024, 5, 25, 11, 0),
      role: 'all',
    },
  ]);

  const [modalShow, setModalShow] = useState(false);
  const [modalStart, setModalStart] = useState(null);
  const [confirmShow, setConfirmShow] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleSelect = ({ start }) => {
    setModalStart(start);
    setModalShow(true);
  };

  const handleSave = async ({ title, startTime, duration, start, role }) => {
    try {
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

            const eventStart = new Date(start);
            eventStart.setHours(adjustedHours);
            eventStart.setMinutes(minutes);
            eventStart.setSeconds(0);
            eventStart.setMilliseconds(0);

            const newEnd = new Date(eventStart.getTime() + duration * 60 * 60 * 1000);

            const response = await axios.post('http://localhost/project1/insert_event.php', new URLSearchParams({
              title,
              start: eventStart.toISOString().slice(0, 19).replace('T', ' '),
              end: newEnd.toISOString().slice(0, 19).replace('T', ' '),
              role
            }));

            console.log(response.data);

            setEvents([...events, { start: eventStart, end: newEnd, title, role }]);
          } else {
            alert('Invalid start time format');
          }
        } else {
          alert('Invalid start time format');
        }
      } else {
        alert('Invalid input for duration');
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEventSelect = (event) => {
    setEventToDelete(event);
    setConfirmShow(true);
  };

  const handleConfirmDelete = () => {
    setEvents(events.filter((e) => e !== eventToDelete));
    setConfirmShow(false);
    setEventToDelete(null);
  };

  return (
    <div className="App">
      <h1>Library Event Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventSelect}
      />
      <TaskModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleSave={handleSave}
        start={modalStart}
      />
      {eventToDelete && (
        <ConfirmModal
          show={confirmShow}
          handleClose={() => setConfirmShow(false)}
          handleConfirm={handleConfirmDelete}
          title={eventToDelete.title}
        />
      )}
    </div>
  );
};

export default App;



//task.js

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


//confirimmodel.js

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, handleClose, handleConfirm, title }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove the task '{title}'?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;













CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL,
    role ENUM('all', 'members', 'staff', 'admin') NOT NULL
  );

  



  <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "library_events";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get data from POST request
$title = $_POST['title'];
$start = $_POST['start'];
$end = $_POST['end'];
$role = $_POST['role'];

// Insert data into table
$sql = "INSERT INTO events (title, start, end, role) VALUES ('$title', '$start', '$end', '$role')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>




import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskModal from './components/TaskModal';
import ConfirmModal from './components/ConfirmModal';

const localizer = momentLocalizer(moment);

const App = () => {
  const [events, setEvents] = useState([
    {
      title: 'Library Opening Ceremony',
      start: new Date(2024, 5, 25, 9, 0),
      end: new Date(2024, 5, 25, 11, 0),
      role: 'all',
    },
  ]);

  const [modalShow, setModalShow] = useState(false);
  const [modalStart, setModalStart] = useState(null);
  const [confirmShow, setConfirmShow] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleSelect = ({ start }) => {
    setModalStart(start);
    setModalShow(true);
  };

  const handleSave = async ({ title, startTime, duration, start, role }) => {
    try {
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

            const eventStart = new Date(start);
            eventStart.setHours(adjustedHours);
            eventStart.setMinutes(minutes);
            eventStart.setSeconds(0);
            eventStart.setMilliseconds(0);

            const newEnd = new Date(eventStart.getTime() + duration * 60 * 60 * 1000);

            const response = await axios.post('http://localhost/your_project_folder/insert_event.php', new URLSearchParams({
              title,
              start: eventStart.toISOString().slice(0, 19).replace('T', ' '),
              end: newEnd.toISOString().slice(0, 19).replace('T', ' '),
              role
            }));

            console.log(response.data);

            setEvents([...events, { start: eventStart, end: newEnd, title, role }]);
          } else {
            alert('Invalid start time format');
          }
        } else {
          alert('Invalid start time format');
        }
      } else {
        alert('Invalid input for duration');
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEventSelect = (event) => {
    setEventToDelete(event);
    setConfirmShow(true);
  };

  const handleConfirmDelete = () => {
    setEvents(events.filter((e) => e !== eventToDelete));
    setConfirmShow(false);
    setEventToDelete(null);
  };

  return (
    <div className="App">
      <h1>Library Event Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventSelect}
      />
      <TaskModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleSave={handleSave}
        start={modalStart}
      />
      {eventToDelete && (
        <ConfirmModal
          show={confirmShow}
          handleClose={() => setConfirmShow(false)}
          handleConfirm={handleConfirmDelete}
          title={eventToDelete.title}
        />
      )}
    </div>
  );
};

export default App;
