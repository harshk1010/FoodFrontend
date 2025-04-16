
import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Card, CardHeader } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../State/Order/Action'; // Same API as in Orders
import { OrderCard } from './OrderCard';

const orderStatusOptions = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Out for Delivery', value: 'OUT_FOR_DELIVERY' },
  { label: 'Completed', value: 'COMPLETED' }
];

const Notification = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { order } = useSelector((store) => store);
  const [selectedStatus, setSelectedStatus] = useState('');
  
  // Fetch orders when component mounts
  useEffect(() => {
    dispatch(getUsersOrders(jwt, selectedStatus));
  }, [selectedStatus, dispatch, jwt]);

  // Handle the change in status filter
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  // Function to filter orders by status
  const filterOrdersByStatus = (status) => {
    return (order.orders || []).filter((order) => order.orderStatus === status);
  };

  // Separate orders into different categories based on their status
  const pendingOrders = filterOrdersByStatus('PENDING');
  const outForDeliveryOrders = filterOrdersByStatus('OUT_FOR_DELIVERY');
  const completedOrders = filterOrdersByStatus('COMPLETED');
  const allOrders = order.orders || [];

  return (
    <Box className="flex flex-col items-center">
      <Card className="mt-4 w-full lg:w-3/4">
        <CardHeader title="Notifications" className="text-xl font-semibold" />

        <Box className="px-4 pb-4">
          <ButtonGroup variant="outlined" fullWidth>
            {orderStatusOptions.map((status) => (
              <Button
                key={status.value}
                variant={selectedStatus === status.value ? 'contained' : 'outlined'}
                onClick={() => handleStatusChange(status.value)}
              >
                {status.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {/* Display Orders Based on Selected Status */}
        <Box className="px-6 pb-6 space-y-4">
          {selectedStatus === '' || selectedStatus === 'PENDING' ? (
            <>
              <h2 className="font-semibold">Pending Orders</h2>
              {pendingOrders.map((order) =>
                order.items.map((item) => (
                  <OrderCard key={`${order.id}-${item.id}`} order={order} item={item} />
                ))
              )}
            </>
          ) : null}

          {selectedStatus === '' || selectedStatus === 'OUT_FOR_DELIVERY' ? (
            <>
              <h2 className="font-semibold">Out for Delivery</h2>
              {outForDeliveryOrders.map((order) =>
                order.items.map((item) => (
                  <OrderCard key={`${order.id}-${item.id}`} order={order} item={item} />
                ))
              )}
            </>
          ) : null}

          {selectedStatus === '' || selectedStatus === 'COMPLETED' ? (
            <>
              <h2 className="font-semibold">Completed Orders</h2>
              {completedOrders.map((order) =>
                order.items.map((item) => (
                  <OrderCard key={`${order.id}-${item.id}`} order={order} item={item} />
                ))
              )}
            </>
          ) : null}
        </Box>
      </Card>
    </Box>
  );
};

export default Notification;
