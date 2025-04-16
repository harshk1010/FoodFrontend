
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

const formatEventDate = (arr) => {
  if (!Array.isArray(arr)) return 'Invalid date';
  return dayjs(new Date(...arr)).format('MMMM D, YYYY hh:mm A');
};

const EventCard = ({ event, showDelete = false, onDelete }) => {
  if (!event) return null;

  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image={event.image || 'https://via.placeholder.com/345x345?text=No+Image'}
          title={event.name}
        />
        <CardContent>
          <Typography variant='h5'>{event.name}</Typography>
          <Typography variant='body2'>Special event by {event.restaurant?.name || "restaurant"}</Typography>

          <div className='py-2 space-y-2'>
            <p>{event.location}</p>
            <p className='text-sm text-blue-500'>{formatEventDate(event.startedAt)}</p>
            <p className='text-sm text-red-500'>{formatEventDate(event.endAt)}</p>
          </div>
        </CardContent>

        {showDelete && (
          <CardActions>
            <IconButton onClick={() => onDelete?.(event.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;


