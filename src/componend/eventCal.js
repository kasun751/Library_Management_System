// src/EventCal.js
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './eventCal.css';

const localizer = momentLocalizer(moment);

const EventCal = () => {
  const [events, setEvents] = useState([
    {
      title: 'Library Opening Ceremony',
      start: new Date(2024, 6, 25, 9, 0),
      end: new Date(2024, 6, 25, 11, 0), // Corrected month from 4 to 6 to match start date
    },
  ]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const handleEventSelect = event => {
    if (window.confirm(`Do you want to remove the event '${event.title}'?`)) {
      setEvents(events.filter(e => e !== event));
    }
  };

  return (
    <div className="Cal">
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
    </div>
  );
};

export default EventCal;
