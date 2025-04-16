import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../component/State/Ingredients/Action';

const CreateIngredientCategoryForm = () => {
    const disptach = useDispatch()
    const jwt = localStorage.getItem('jwt')
    const {restaurant} = useSelector(store => store)
    const [formData, setFormData] = useState({
        name:'',
    });    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {name:formData.name,
            restaurantId : restaurant.usersRestaurant.id
        }
        console.log(formData);
        disptach(createIngredientCategory({data,jwt}))
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]:value
        });
    }
  return (
    <div className=''>
        <div className=''>
            <h1 className='text-gray-400 text-center text-xl pb-10'>
                Create Ingredient Category
            </h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <TextField fullWidth
                            id='name'
                            name='name'
                            label='Ingredient Category'
                            variant='outlined'
                            onChange={handleInputChange}
                            value={formData.name}
                            >
                </TextField>
                <Button variant='contained' color='primary' type='submit'>
                    Create Category
                </Button>
            </form>
        </div>
    </div>
  )
}

export default CreateIngredientCategoryForm