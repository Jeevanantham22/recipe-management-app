import { gql } from '@apollo/client';

export const ADD_RECIPE = gql`
mutation AddRecipe($input: RecipeInput!) {
  addRecipe(input: $input) {
    id
    title
    category
    ingredients
    instructions
    date   
    imageURL 
  }
}
`;

export const GET_RECIPE = gql`
query GetRecipe($id: ID!) {
  recipe(id: $id) {
    id
    title
    category
    ingredients
    instructions
    date
    imageURL
  }
}
`;


export const EDIT_RECIPE = gql`
  mutation EditRecipe($id: ID!, $input: RecipeInput!) {
    editRecipe(id: $id, input: $input) {
      id
      title
      category
      ingredients
      instructions
      date
      imageURL
    }
  }
`;

export const DELETE_RECIPE = gql`
mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;

export const GET_RECIPES_BY_USER = gql`
query GetRecipesByUser($userId: String!) {
  recipesByUser(userId: $userId) {
    id
    title
    category
    ingredients
    instructions
    date
    imageURL
    userId
  }
}
`;
