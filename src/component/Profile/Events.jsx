
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from './EventCard';
import { getAllEvents } from '../State/Restaurant/Action';

const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // const { events = [], loading } = useSelector((state) => state.events || {});
  const { events = [], loading } = useSelector((state) => state.restaurant || {});
  console.log(events, "events");
  
  useEffect(() => {
    if (jwt) {
      dispatch(getAllEvents({ jwt }));
    }
  }, [dispatch, jwt]);

  return (
    <div className='mt-5 px-5'>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className='flex flex-wrap gap-5'>
        {events.map((event) => (
  <EventCard key={event.id} event={event} />
))}

        </div>
      )}
    </div>
  );
};

export default Events;
