import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import { createReview } from '../State/Review/Action';

const ReviewFormModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { auth, restaurant } = useSelector((state) => state);

  const [restaurantId, setRestaurantId] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (jwt) {
      dispatch(getAllRestaurantsAction(jwt));
    }
  }, [dispatch, jwt]);

  const handleSubmit = () => {
    if (!restaurantId || rating === 0 || message.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
   

    const reviewData = {
      rating,
      message,
    };
    console.log(reviewData);
    dispatch(createReview(auth?.user?.id,restaurantId,reviewData, jwt));
    onClose();
    setRestaurantId('');
    setRating(0);
    setMessage('');
  };

  const handleRestaurantChange = (e) => {
    // Debugging log to check if the restaurant ID is being selected
    console.log('Selected Restaurant ID:', e.target.value);
    setRestaurantId(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Write a Review</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth margin="normal">
          <InputLabel id="restaurant-select-label" sx={{ color: '#fff' }}>
            Select Restaurant
          </InputLabel>
          <Select
            labelId="restaurant-select-label"
            value={restaurantId}
            label="Select Restaurant"
            onChange={handleRestaurantChange} // Updated this line to use the function
            sx={{
              backgroundColor: 'primary',
              color: '#fff',
              '& .MuiSelect-icon': {
                color: '#000',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#fff',
                  color: '#000',
                },
              },
            }}
          >
            {restaurant.restaurants?.map((res) => (
              <MenuItem
                key={res.id}
                value={res.id} // Ensure this is the correct value
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#e0e0e0 !important',
                    color: '#000',
                  },
                }}
              >
                {res.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Rating
            name="rating"
            value={rating}
            precision={0.5}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </FormControl>

        <TextField
          label="Your Review"
          fullWidth
          multiline
          minRows={4}
          margin="normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewFormModal;

