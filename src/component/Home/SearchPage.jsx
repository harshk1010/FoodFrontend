
import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Card,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { searchFoodAction } from "../State/Food/Action";
import { addItemToCart } from "../State/Cart/Action";
import _ from "lodash";
import { topMeal } from "./topMeal";

const FoodSearchPage = () => {
  const [query, setQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]); // Added state for selected ingredients
  const dispatch = useDispatch();

  const { loading, foodItems } = useSelector((state) => state.searchFood);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const debouncedSearch = React.useMemo(
    () =>
      _.debounce((value) => {
        if (value.trim() !== "") {
          dispatch(searchFoodAction(value));
        }
      }, 400),
    [dispatch]
  );

  useEffect(() => {
    if (query.trim() !== "") {
      debouncedSearch(query);
    }
    return debouncedSearch.cancel;
  }, [query, debouncedSearch]);

  const handleAddItemToCart = (item) => {
    const reqData = {
      token: localStorage.getItem('jwt'),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients, // Selected ingredients for the item
      },
    };
    dispatch(addItemToCart(reqData)); // Dispatch the action with the request data
    console.log('req data ', reqData); // Log the request data for debugging
  };

  return (
    <Box sx={{ backgroundColor: "#111", minHeight: "100vh", color: "#fff", py: 4 }}>
      <Box sx={{ width: "70%", mx: "auto" }}>
        {/* Search Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#222",
            px: 2,
            py: 1,
            borderRadius: "8px",
            mb: 4,
          }}
        >
          <InputBase
            placeholder="Search food..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ flex: 1, color: "#fff" }}
          />
          <IconButton sx={{ color: "#fff" }}>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </Box>

        {/* Popular Cuisines */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Popular Cuisines
        </Typography>
        <Box sx={{ display: "flex", overflowX: "hidden", mb: 4 }}>
          {topMeal.map((meal, i) => (
            <Box
              key={i}
              sx={{
                textAlign: "center",
                mr: 1,
                width: "90px", // Adjusted width to make it less bulky
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 100, // Adjusted image size to make it more consistent
                  height: 100,
                  borderRadius: "50%",
                  overflow: "hidden",
                  mb: 1,
                  border: "2px solid #444",
                }}
              >
                <img
                  src={meal.image}
                  alt={meal.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Typography variant="body2" noWrap>
                {meal.title}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Search Results */}
        {loading && (
          <Typography align="center" sx={{ my: 4 }}>
            Loading...
          </Typography>
        )}

        {!loading && query.trim() !== "" && foodItems.length === 0 && (
          <Typography align="center" sx={{ my: 4 }}>
            No food items found.
          </Typography>
        )}

        <Grid container spacing={2}>
          {foodItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card
                sx={{
                  display: "flex",
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flex: 1, p: 2 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="gray" sx={{ my: 1 }}>
                    ₹{item.price}
                  </Typography>
                  {item.description && (
                    <Typography variant="body2" sx={{ color: "#bbb" }}>
                      {item.description}
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    sx={{ color: "#888", mt: 1, display: "block" }}
                  >
                    {item.foodCategory?.name ? `Category: ${item.foodCategory.name}` : ""}
                    {item.restaurant?.cuisineType ? ` • Cuisine: ${item.restaurant.cuisineType}` : ""}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 1,
                      backgroundColor: "rgb(233,30,99)", // Using the new pink color
                      color: "#fff",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "rgb(248, 78, 121)",
                      },
                    }}
                    onClick={() => handleAddItemToCart(item)} // Pass the item to the handler
                  >
                    ADD
                  </Button>
                </Box>
                <CardMedia
                  component="img"
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "0 8px 8px 0",
                  }}
                  image={item.images?.[0] || "https://source.unsplash.com/100x100/?food"}
                  alt={item.name}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FoodSearchPage;




