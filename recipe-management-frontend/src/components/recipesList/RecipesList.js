import React, { useEffect, useReducer, useState } from 'react'
import RecipeCard from '../recipeCard/RecipeCard';
import './RecipesList.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRecipeContext } from '../../services/context/recipeContext'
import { TextField } from '@mui/material';
import Button from "@mui/material/Button";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_RECIPES_BY_USER } from '../../services/graphql/recipeMutation';

const RecipesList = () => {
  const { state, dispatch } = useRecipeContext();
  const userId = localStorage.getItem("userId");
  const { loading, error, data, refetch } = useQuery(GET_RECIPES_BY_USER, {
    variables: { userId },
  });
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dashboard: ");
    dispatch({ type: 'VIEW_DETAIL', payload: null });
  }, [dispatch]);

  useEffect(() => {
    if (data && data?.recipesByUser) {
      dispatch({ type: 'SET_RECIPES', payload: data?.recipesByUser });
    }
  }, [data, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filterByCategory = (recipes) => {
    return recipes.filter((recipe) =>
      category ? recipe.category.toLowerCase() === category.toLowerCase() : true
    );
  };

  const filterBySearchText = (recipes) => {
    return recipes.filter((recipe) => {
      const searchLower = searchText.toLowerCase();
      return recipe.title.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchLower)
        );
    });
  };

  const filteredRecipes = filterBySearchText(filterByCategory(state.recipes || []));

  const addRecipeButtonClicked = () => {
    dispatch({ type: 'VIEW_DETAIL', payload: null });
    navigate('/dashboard/addRecipe');
  };

  return (
    <div className="outerListContainer">
      <div className="searchOuterContainer">
        <div className="searchInnerContainer" >
          <h1>Explore Recipes from {filteredRecipes.length} Delicious Options Found</h1>
          <div className='searchContainer'>
            <div className='searchBar'>
              <TextField
                className='searchTextField'
                id="outlined-basic"
                variant="outlined"
                placeholder="Search recipes..."
                onChange={(e) => { setSearchText(e.target.value); }}
                value={searchText}
              />
            </div>
            <Select
              className='selectCategory'
              value={category}
              onChange={(e) => { setCategory(e.target.value); }}
              displayEmpty
            >
              <MenuItem value="">All Recipes</MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="listTitleContainer">
      <h1>Recipes</h1>
        <div className="addRecipe">         
          <Button variant="contained" className="addRecipeButton" startIcon={<ControlPointIcon />} onClick={addRecipeButtonClicked}>
            Add Recipe
          </Button>            
        </div>       
      </div>   
      <div className='innerListContainer'>
        {
          filteredRecipes.map((item) => (
            <RecipeCard key={item.id} recipeDetails={item} refetch={refetch} />
          ))
        }
      </div>
    </div>
  );
};

export default RecipesList;