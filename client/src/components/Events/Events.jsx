import React, { useEffect, useState } from 'react';
import EventBox from '../EventBox/EventBox';
import './Events.css';
import Navbar from '../NavBar/Navbar';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8001/event/");
      const json = await response.json();
      setEvents(json.data);  
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchText.toLowerCase()) || event.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className='events'>
        <h1>Events</h1>
        <div className="filter">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Enter your search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>
        </div>
        <ul>
          {filteredEvents.reverse().map((e) => (
            <EventBox
              key={e._id}
              title={e.title}
              description={e.description}
              location={e.location}
              img={`http://localhost:8001/assets/${e.image}`}
              _id={e._id}
              participants={e.participants}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Events;
