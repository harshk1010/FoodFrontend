

import {
  Box, Button, Grid, Modal, TextField, Typography
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { createEventAction, getAllEvents } from '../../component/State/Restaurant/Action';
import EventCard from './EventCard';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: '',
  location: '',
  name: '',
  startedAt: dayjs(),
  endAt: dayjs(),
};

const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { restaurant } = useSelector((state) => state);
   const { events = [], loading } = useSelector((state) => state.restaurant || {});
  const restaurantId = restaurant?.usersRestaurant?.id;

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (jwt) {
      dispatch(getAllEvents({jwt}));
    }
  }, [dispatch, jwt]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormValues(initialValues);
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (val, type) => {
    setFormValues({ ...formValues, [type]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEventAction({ data: formValues, restaurantId, jwt }))
    .then(() => {
      dispatch(getAllEvents({ jwt })); // ✅ Refetch events
      handleClose();                   // ✅ Close modal after success
    });
  };

  return (
    <div className='p-6'>
      <Box className='flex justify-between items-center mb-4'>
        <Typography variant='h4'>Events</Typography>
        <Button variant='contained' onClick={handleOpen}>Create New Event</Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant='h6' mb={2}>Create New Event</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField name='image' label='Image URL' fullWidth value={formValues.image} onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField name='location' label='Location' fullWidth value={formValues.location} onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField name='name' label='Event Name' fullWidth value={formValues.name} onChange={handleFormChange} />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label='Start Date & Time'
                    value={formValues.startedAt}
                    onChange={(val) => handleDateChange(val, 'startedAt')}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label='End Date & Time'
                    value={formValues.endAt}
                    onChange={(val) => handleDateChange(val, 'endAt')}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' fullWidth variant='contained'>Create</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

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
    </div>
  );
};

export default Events;
