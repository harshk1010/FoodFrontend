
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress, getUserAddresses } from '../State/Address/Action';

import {
  Card,
  Box,
  Typography,
  Divider,
  IconButton,
  CardContent,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';

const Address = () => {
  const dispatch = useDispatch();

  const { user, isLoading: authLoading, error: authError } = useSelector((state) => state.auth || {});
  const { addresses = [], isLoading: addressLoading, error: addressError } = useSelector((state) => state.address || {});

  const jwt = localStorage.getItem("jwt");
  const userId = user?.id;

  useEffect(() => {
    if (jwt && userId) {
      dispatch(getUserAddresses(jwt, userId));
    }
  }, [dispatch, jwt, userId]);
s

    // const handleDeleteAddress = (id) => {
    //   dispatch(deleteAddress(id));
    // };


  if (authLoading || addressLoading) return <p className="text-center">Loading addresses...</p>;
  if (authError || addressError) return <p className="text-red-500 text-center">Error: {authError || addressError}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">My Saved Addresses</h1>

      { Array.isArray(addresses) && addresses.length === 0 ? (
        <p className="text-center text-gray-400">You have no saved addresses.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          { Array.isArray(addresses) && addresses.length > 0 ? (
          {addresses.map((address) => (
            <Card
              key={address.id}
              className="bg-gray-900 text-white rounded-2xl shadow-md border border-gray-700"
            >
              <CardContent>
                {/* Header */}
                <Box className="flex justify-between items-center mb-4">
                  <Box className="flex items-center gap-2">
                    <HomeIcon className="text-white" />
                    <Typography variant="h6" className="text-white font-semibold">
                      Home
                    </Typography>
                  </Box>
                  {/* <IconButton
                    size="small"
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-gray-400 hover:text-red-500 transition duration-150"
                  >
                    <DeleteIcon />
                  </IconButton> */}
                </Box>

                <Divider className="bg-gray-700 mb-4" />

             
                  {/* Address Info */}
                  <Typography variant="body2" className="text-gray-300 mb-1 pt-2">
                  {address.streetAddress}
                </Typography>
                <Typography variant="body2" className="text-gray-300 mb-1">
                  {address.city}, {address.state}
                </Typography>
                <Typography variant="body2" className="text-gray-300">
                  {address.postalCode}, {address.country}
                </Typography>
          
              </CardContent>
            </Card>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Address;



