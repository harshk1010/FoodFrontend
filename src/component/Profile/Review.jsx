
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Grid,
  CardMedia,
  Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsByUser } from '../State/Review/Action';
import { getUser } from '../State/Authentication/Action';
import ReviewFormModal from './ReviewFormModal'; // Modal component to create reviews

const Review = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { review } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (auth?.user?.id && jwt) {
      dispatch(getReviewsByUser(auth.user.id, jwt));
    }
  }, [dispatch, auth?.user?.id, jwt]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      {/* Header */}
      <Typography variant="h4" component="h2" gutterBottom>
        My Reviews
      </Typography>

      {/* Add Review Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => setOpenModal(true)}
      >
        Write a Review
      </Button>

      {/* Cards Container */}
      <Box width="70%">
        <CardContent>
          <Grid container spacing={3}>
            {Array.isArray(review.reviews) &&review.reviews?.length > 0 ? (
              review.reviews.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ display: 'flex', minHeight: 200 }}>
                    {/* Left: Review Info */}
                    <Box sx={{ flex: 2, p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {item.restaurant?.name}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Rating value={item.rating} precision={0.5} readOnly />
                        <Typography variant="body2" color="text.secondary">
                          ({item.rating} Stars)
                        </Typography>
                      </Box>
                      <Typography variant="body1">"{item.message}"</Typography>
                    </Box>

                    {/* Right: Restaurant Image */}
                    <CardMedia
                      component="img"
                      sx={{
                        width: 200,
                        height: '100%',
                        objectFit: 'cover',
                        paddingTop: 3,
                        paddingRight: 3,
                      }}
                      image={item.restaurant?.images?.[0] || 'https://via.placeholder.com/200'}
                      alt={item.restaurant?.name}
                    />
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No reviews found.
              </Typography>
            )}
          </Grid>
        </CardContent>
      </Box>

      {/* Review Creation Modal */}
      <ReviewFormModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};

export default Review;


