import React, { createContext } from "react";
import { useQuery } from '@apollo/client';
import { GET_RECIPES_BY_USER } from '../graphql/recipeMutation';
import { useReducer, useContext } from 'react';
import { recipeReducer } from "../reducers/recipeReducer";

const RecipeContext = createContext();
const initialState = {
  recipes: [],
  recipeDetails: null,   
};

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const userId = localStorage.getItem('userId');
  const { loading, error, data, refetch } = useQuery(GET_RECIPES_BY_USER, {
    variables: { userId },
  });

    React.useEffect(() => {
        if (data) {
            dispatch({ type: 'SET_RECIPES', payload: data?.recipesByUser });
        }
    }, [data]);

  return (
    <RecipeContext.Provider value={{ state, dispatch, refetch}}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);
