
import React, { useEffect, useState } from 'react';
import { FormControlLabel, FormControl, Grid, RadioGroup, Typography, Divider, Radio } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian only", value: "vegetarian" },
  { label: "Non-Vegetarian", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" }
];

const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, restaurant, menu } = useSelector(store => store);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFilter = (e) => {
    setFoodType(e.target.value);
  };

  const handleFilterCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
  }, [dispatch, id, jwt]);

  useEffect(() => {
    dispatch(getMenuItemsByRestaurantId({
      jwt,
      restaurantId: id,
      vegetarian: foodType === "vegetarian",
      nonveg: foodType === "non_vegetarian",
      seasonal: foodType === "seasonal",
      foodCategory: selectedCategory
    }));
  }, [dispatch, foodType, selectedCategory, id, jwt]);

  return (
    <div className='px-5 lg:px-20'>
      <section>
        <h3 className='text-gray-500 py-2 mt-10'>
          Home / India / {restaurant.restaurant?.name}
        </h3>
        <Grid container spacing={2}>
          {[0, 1, 2].map((i) => (
            restaurant.restaurant?.images[i] && (
              <Grid key={i} item xs={12} lg={i === 0 ? 12 : 6}>
                <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant.images[i]} alt='' />
              </Grid>
            )
          ))}
        </Grid>
        <div className='pt-3 pb-5'>
          <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
          <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>
          <div className='space-y-3 mt-3'>
            <p className='text-gray-500 flex items-center gap-3'>
              <LocationOnIcon />
              <span>{restaurant.restaurant?.address?.city}, {restaurant.restaurant?.address?.state}</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
              <CalendarTodayIcon />
              <span>{restaurant.restaurant?.openingHours}</span>
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section className='pt-[2rem] lg:flex relative'>
        <div className='space-y-10 lg:w-[20%] filter'>
          <div className='box space-y-5 lg:sticky top-28'>
            {/* Food Type */}
            <div>
              <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>Food Type</Typography>
              <FormControl className='py-10 space-y-5' component="fieldset">
                <RadioGroup name='food_type' value={foodType} onChange={handleFilter}>
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

            <Divider />

            {/* Food Category */}
            <div>
              <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>Food Category</Typography>
              <FormControl className='py-10 space-y-5' component="fieldset">
                <RadioGroup name='food_category' value={selectedCategory} onChange={handleFilterCategory}>
                  {restaurant.categories.map((item) => (
                    <FormControlLabel
                      key={item.name}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        <div className='space-y-5 lg:w-[80%] lg:pl-10'>
          {menu.menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
