
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import AddressCart from "./AddressCart";
import {
  Divider,
  Grid,
  Modal,
  TextField,
  Button,
  Card,
  Box,
  IconButton,
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import DeleteIcon from "@mui/icons-material/Delete";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";
import {
  saveAddress,
  getUserAddresses,
  deleteAddress,
} from "../State/Address/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const { addresses } = useSelector((store) => store.address);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handleOpenAddressModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const itemTotal = cart.cartItems?.reduce((acc, item) => acc + item.totalprice, 0) || 0;
  const deliveryFee = 21;
  const gstAndCharges = 33;
  const totalPayable = itemTotal + deliveryFee + gstAndCharges;

  const handleSubmit = (values, { resetForm }) => {
    const addressPayload = {
      streetAddress: values.streetAddress,
      city: values.city,
      state: values.state,
      postalCode: values.pincode,
      country: "India",
    };
    dispatch(saveAddress(addressPayload)).then(() => {
      dispatch(getUserAddresses());
      setOpen(false);
      resetForm();
    });
  };

  const createOrderUsingSelectedAddress = (address) => {
    const firstCartItem = cart.cartItems?.[0];

    if (!firstCartItem || !firstCartItem.food?.restaurant?.id) {
      console.error("Cart is empty or missing restaurant info.");
      return;
    }

    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: firstCartItem.food.restaurant.id,
        deliveryAddress: address,
      },
    };

    dispatch(createOrder(data)).then(() => {
      dispatch(getUserAddresses());
    });
  };

  // const handleDeleteAddress = (id) => {
  //   dispatch(deleteAddress(id)).then(() => {
  //     dispatch(getUserAddresses());
  //   });
  // };

  return (
    <div>
      <main className="lg:flex justify-between">
        {/* Cart Items Section */}
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems?.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>₹{itemTotal}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>₹{deliveryFee}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>₹{gstAndCharges}</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400 font-semibold pt-2">
                <p>Total Pay</p>
                <p>₹{totalPayable}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Address Section */}
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
           {Array.isArray(addresses) && addresses.length > 0 ? (    
        addresses?.map((address) => (
  <Card
    key={address.id}
    className="relative w-64 p-4"
    sx={{ position: "relative", overflow: "visible" }}
  >
    {/* <IconButton
      onClick={() => handleDeleteAddress(address.id)}
      sx={{
        position: "absolute",
        top: 8,
        right: 10,
        color: "white",
        "&:hover": {
          color: "#fce4ec",
        },
      }}
      size="small"
    >
      <DeleteIcon />
    </IconButton> */}

    <AddressCart
      handleSelectAddress={() =>
        createOrderUsingSelectedAddress(address)
      }
      item={address}
      showButton={true}
    />
  </Card>
))}


              {/* Add New Address Card */}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModal}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Address Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" color="primary">
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;

