import React from 'react';
import './EventDetails.css';

const EventsDetails = ({ event }) => {
  if (!event) {
    return <div className="no-event">No event data available</div>;
  }

  const calculateTimeRemaining = (eventDate) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);
    const timeDiff = eventDateTime - now;

    if (timeDiff < 0) {
      return <span className="completed">Completed</span>;
    }

    if (now.toDateString() === eventDateTime.toDateString()) {
      return <span className="live">Live</span>;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m remaining`;
  };

  return (
    <div className="event-card">
      <div className="event-card-container">
        <div className="event-image-container">
          <img src={event.image} alt={event.heading} className="event-image" />
          <div className="time-remaining">
            {calculateTimeRemaining(event.date)}
          </div>
        </div>
        <h3 className="event-heading">{event.heading}</h3>
        <p className="event-description">{event.description}</p>
      </div>
    </div>
  );
};

export default EventsDetails;
