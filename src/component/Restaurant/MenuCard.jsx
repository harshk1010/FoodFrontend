
import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../util/categorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();

  const handleCheckBoxChange = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(
        selectedIngredients.filter((name) => name !== ingredientName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  console.log('itemssssssss', item);

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem('jwt'),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients, // This will be an array of strings
      },
    };
    dispatch(addItemToCart(reqData));
    console.log('req data ', reqData);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt=""
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>{item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.entries(categorizeIngredients(item.ingredients)).map(
              ([category, ingredients]) => (
                <div key={category}>
                  <p className="font-semibold">{category}</p>
                  <FormGroup>
                    {ingredients.map((ingredient) => (
                      <FormControlLabel
                        key={ingredient.id}
                        control={
                          <Checkbox
                            onChange={() =>
                              handleCheckBoxChange(ingredient.name)
                            }
                            checked={selectedIngredients.includes(
                              ingredient.name
                            )}
                          />
                        }
                        label={ingredient.name}
                      />
                    ))}
                  </FormGroup>
                </div>
              )
            )}
          </div>
          <div className="pt-5">
            <Button variant="contained" type="submit">
              Add to Cart
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;


