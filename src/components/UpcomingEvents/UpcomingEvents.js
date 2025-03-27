import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './UpcomingEvents.css';
import EventsDetails from '../EventsDetails/EventsDetails';
import Modal from '../Modal/Modal';

function UpcomingEvents({ isLoggedIn }) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    heading: '',
    description: '',
    image: '',
    date: ''
  });

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/upcoming-events`);
        setUpcomingEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch upcoming events');
        setLoading(false);
        console.error('Error fetching upcoming events:', err);
      }
    };

    fetchUpcomingEvents();
  }, []);

  useEffect(() => {
    const moveCompletedEvents = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/move-completed-events`);
        // Refresh the list of upcoming events
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/upcoming-events`);
        setUpcomingEvents(response.data);
      } catch (err) {
        console.error('Error moving completed events:', err);
      }
    };

    const interval = setInterval(moveCompletedEvents, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const eventDate = new Date(newEvent.date);
    const now = new Date();

    // Compare only the date part
    if (eventDate.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0)) {
      alert('You cannot add an event with a past date. Please select a future date.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/upcoming-events`, newEvent);
      setUpcomingEvents([...upcomingEvents, newEvent]);
      setNewEvent({ heading: '', description: '', image: '', date: '' });
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to add event');
    }
  };

  const openModal = (id) => {
    setSelectedEventId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/upcoming-events/${selectedEventId}`);
      setUpcomingEvents(upcomingEvents.filter(event => event.id !== selectedEventId));
      closeModal();
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event');
    }
  };

  return (
    <div className="upcoming-events-page">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this upcoming event?"
      />
      <div className="upcoming-events-container">
        <h1>Upcoming Events</h1>
        <div className="upcoming-events-content">
          <p>
            Get ready for our exciting lineup of upcoming events. Mark your calendars and don't miss out!
          </p>
          <p>
            We're constantly planning new and innovative events to bring our community together.
            Check back regularly for updates.
          </p>
        </div>
        {isLoggedIn && (
          <form className="add-event-form" onSubmit={handleAddEvent}>
            <h2>Add New Event</h2>
            <input
              type="text"
              name="heading"
              placeholder="Event Heading"
              value={newEvent.heading}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Event Image URL"
              value={newEvent.image}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="submit-button">Add Event</button>
          </form>
        )}
        {loading ? (
          <div className="loader-container">
            <div className="spinner-loader">
              <div className="spinner-inner"></div>
            </div>
            <p>Loading upcoming events...</p>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <ul className="events-list">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="events-list-item">
                <EventsDetails event={event} />
                {isLoggedIn && (
                  <button onClick={() => openModal(event.id)} className="delete-button">
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UpcomingEvents; 