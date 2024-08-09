import { ACTIONS } from "../actions/actions";

export const recipeReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_RECIPES:
            return { ...state, recipes: action.payload };
        case ACTIONS.ADD_RECIPE:
            return { ...state, recipes: [...state.recipes, action.payload] };
        case ACTIONS.EDIT_RECIPE:
            return {
                ...state,
                recipes: state.recipes.map(recipe =>
                    recipe.id === action.payload.id ? action.payload : recipe
                ),
            };
        case ACTIONS.VIEW_DETAIL:
            return {
                ...state,
                recipeDetails: action.payload
            }

        default:
            return state;
    }
}; 