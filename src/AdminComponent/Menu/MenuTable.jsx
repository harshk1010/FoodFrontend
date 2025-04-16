

import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress
} from '@mui/material';
import React, { useEffect } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../component/State/Menu/Action';

const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  const restaurantId = restaurant?.usersRestaurant?.id;


  useEffect(() => {
    if (restaurantId && menu.menuItems.length === 0) {
      dispatch(getMenuItemsByRestaurantId({
        jwt,
        restaurantId,
        vegetarian: false,
        nonveg: false,
        seasonal: false,
        foodCategory: false
      }));
    }
  }, [dispatch,restaurantId,jwt]);
  
  

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  // ⏳ Optional: loading fallback
  if (!restaurantId || menu.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={() => navigate('/admin/restaurants/add-menu')} aria-label="add">
              <CreateIcon />
            </IconButton>
          }
          title={'Menu'}
          sx={{ pt: 2, alignItems: 'center' }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="menu table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Availability</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(menu.menuItems || []).length > 0 ? (
                menu.menuItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Avatar src={item?.images?.[0]} />
                    </TableCell>
                    <TableCell align="right">{item?.name}</TableCell>
                    <TableCell align="right">
                      {(item?.ingredients || []).map((ingredient) => (
                        <Chip key={ingredient.id} label={ingredient.name} sx={{ m: 0.5 }} />
                      ))}
                    </TableCell>
                    <TableCell align="right">₹{item?.price}</TableCell>
                    <TableCell align="right">{item?.available ? 'In Stock' : 'Out of Stock'}</TableCell>
                    <TableCell align="right">
                      <IconButton color='primary' onClick={() => handleDeleteFood(item.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2">No menu items found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default MenuTable;
