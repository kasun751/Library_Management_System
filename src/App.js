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
