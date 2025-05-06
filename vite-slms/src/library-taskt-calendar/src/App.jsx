import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskModal from './componend/TaskModal';
import ConfirmModal from './componend/ConfirmModal';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { isLibrarian } from '../../userAuthFun';

const localizer = momentLocalizer(moment);

const App = () => {
    const [events, setEvents] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalStart, setModalStart] = useState(null);
    const [confirmShow, setConfirmShow] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    
    
    let userRole = ''; // This would be dynamic in a real app
    if(isLibrarian()){
        userRole='librarian'
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const userIDTemp =localStorage.getItem('userID');
            console.log(userIDTemp)
            const response = await axios.get(`http://localhost:80/project_1/TaskPanel/fetchEvents.php?role=${userIDTemp}`);
            const eventsFromDB = response.data.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
            }));
            console.log(response.data)
            setEvents(eventsFromDB);
        } catch (error) {
            console.error('Error fetching events:', error);
            alert('Error fetching events: ' + error.message);
        }
    };

    const handleSelect = ({ start }) => {
        if (userRole !== 'librarian') {
            alert("Only librarians can add tasks.");
            return;
        }
        
        const now = moment().startOf('day');
        if (moment(start).isSameOrAfter(now)) {
            setModalStart(start);
            setModalShow(true);
        } else {
            alert("You cannot add tasks to past dates.");
        }
    };
    
    const handleSave = async ({ title, startTime, duration, start, role }) => {
        if (userRole !== 'librarian') {
            alert("Only librarians can add tasks.");
            return;
        }
    
        try {
            console.log('Saving event:', { title, startTime, duration, start, role });
            
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
    
                        console.log('Sending request to server:', {
                            title,
                            start: formattedStart,
                            end: formattedEnd,
                            role,
                            userRole
                        });
    
                        const response = await axios.post('http://localhost:80/project_1/TaskPanel/EventManagerController.php',
                            {
                                title: title,
                                start: formattedStart,
                                end: formattedEnd,
                                role: role,
                                userRole: userRole
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
    
                        console.log('Server response:', response.data);
    
                        if (response.data.success) {
                            alert('Task added successfully');
                            fetchEvents();
                            setModalShow(false);
                        } else {
                            alert(response.data.error || 'Failed to add task');
                        }
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
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
                alert('Error saving event: ' + JSON.stringify(error.response.data));
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                alert('No response received from server. Check your network connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                alert('Error saving event: ' + error.message);
            }
        }
    };
    const handleEventSelect = (event) => {
        if (userRole === 'librarian') {
            setEventToDelete(event);
            setConfirmShow(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (userRole !== 'librarian') {
            alert("Only librarians can delete tasks.");
            return;
        }

        try {
            const response = await axios.delete('http://localhost:80/project_1/TaskPanel/deleteEvent.php', {
                data: { id: eventToDelete.id, userRole: userRole }
            });

            if (response.data.success) {
                fetchEvents();
                alert('Event deleted successfully');
            } else {
                alert(response.data.error || 'Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Error deleting event: ' + (error.response?.data?.error || error.message));
        }

        setConfirmShow(false);
        setEventToDelete(null);
    };

    return (
        <>
            <HeaderComponent
                id="homePageHeader" router1={"/"} Link1={"Home"}
                router2={"/dashboard"} Link2={"DashBoard"}
                 Link7={"Log Out"}
            />
            <div className="taskC">
             <div className="App">
                <h1>Library Task Calendar</h1>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    selectable={userRole === 'librarian'}
                    onSelectSlot={handleSelect}
                    onSelectEvent={handleEventSelect}
                />
                {userRole === 'librarian' && (
                    <TaskModal
                        show={modalShow}
                        handleClose={() => setModalShow(false)}
                        handleSave={handleSave}
                        start={modalStart}
                    />
                )}
                {eventToDelete && userRole === 'librarian' && (
                    <ConfirmModal
                        show={confirmShow}
                        handleClose={() => setConfirmShow(false)}
                        handleConfirm={handleConfirmDelete}
                        title={eventToDelete.title}
                    />
                )}
            </div>
            </div>
            <div>
                <FooterComponent />
            </div>
        </>
    );
};

export default App;