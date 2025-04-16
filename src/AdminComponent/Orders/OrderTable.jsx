

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from '../../component/State/Restaurant Order/Action';

const orderStatus = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Out For Delivery', value: 'OUT_FOR_DELIVERY' }
  // { label: 'Delivered', value: 'DELIVERED' },
];

const OrderTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { restaurant, restaurantOrder } = useSelector((store) => store);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  useEffect(() => {
    if (restaurant?.usersRestaurant?.id) {
      dispatch(
        fetchRestaurantsOrder({
          jwt,
          restaurantId: restaurant.usersRestaurant.id,
          orderStatus: selectedStatus || undefined,
        })
      );
    }
  }, [dispatch, jwt, restaurant?.usersRestaurant?.id, selectedStatus]);

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handleMenuOpen = (event, orderId) => {
    setMenuAnchor(event.currentTarget);
    setCurrentOrderId(orderId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setCurrentOrderId(null);
  };

  const handleUpdateOrder = (orderStatus) => {
    if (currentOrderId) {
      dispatch(updateOrderStatus({ orderId: currentOrderId, orderStatus, jwt }));
    }
    handleMenuClose();
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title={'All Orders'} sx={{ pt: 2, alignItems: 'center' }} />

        <Box sx={{ mb: 2, px: 2 }}>
          <ButtonGroup variant="outlined">
            <Button
              variant={!selectedStatus ? 'contained' : 'outlined'}
              onClick={() => handleStatusFilter('')}
            >
              All
            </Button>
            {orderStatus.map((status) => (
              <Button
                key={status.value}
                variant={selectedStatus === status.value ? 'contained' : 'outlined'}
                onClick={() => handleStatusFilter(status.value)}
              >
                {status.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                {/* <TableCell align="right">Ingredients</TableCell> */}
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(restaurantOrder.orders || []).map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items?.map((orderItem, index) => (
                        <Avatar
                          key={index}
                          src={orderItem.food?.images?.[0]}
                          alt={orderItem.food?.name}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullName}</TableCell>
                  <TableCell align="right">${item.totalPrice}</TableCell>
                  <TableCell align="right">
                    {item.items?.map((orderItem, idx) => (
                      <p key={idx}>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  {/* <TableCell align="right">
                    {item.items?.map((orderItem, idx) => (
                      <div key={idx}>
                        {orderItem.ingredients?.map((ingredient, i) => (
                          <Chip
                            key={i}
                            label={ingredient}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </div>
                    ))}
                  </TableCell> */}
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      aria-controls={menuAnchor ? 'status-menu' : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleMenuOpen(e, item.id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Menu
        id="status-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {orderStatus.map((status) => (
          <MenuItem
            key={status.value}
            onClick={() => handleUpdateOrder(status.value)}
          >
            {status.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default OrderTable;

