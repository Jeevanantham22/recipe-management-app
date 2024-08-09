import React, { useReducer, useState } from 'react'
import './ViewRecipe.css';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useRecipeContext } from '../../services/context/recipeContext';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMutation } from '@apollo/client';
import { DELETE_RECIPE } from '../../services/graphql/recipeMutation';

const ViewRecipe = () => {
    const navigate = useNavigate();
    const { state, dispatch, refetch } = useRecipeContext();
    const [deleteRecipe] = useMutation(DELETE_RECIPE);
    const [openDialog, setOpenDialog] = useState(false);

    const handleEdit = () => {
        dispatch({ type: 'VIEW_DETAIL', payload: state?.recipeDetails });
        navigate('/dashboard/editrecipe');
    }

    const handleDelete = async () => {
        try {
            await deleteRecipe({ variables: { id: state?.recipeDetails.id } });
            if (refetch) {
                await refetch();
            }
            dispatch({ type: 'VIEW_DETAIL', payload: null });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        } finally {
            setOpenDialog(false);
        }
    };

    return (
        <div className="outerListContainer">
            <div className='viewRecipeContainer'>
                <div className='detailsLayoutContainer'>
                    <div className='detailsContainer'>
                        <div className='titleConatiner'>
                            <div className="titleCategoryDiv">
                                <h1>{state?.recipeDetails?.title}</h1>
                                <p className={`recipeCategory categoryName ${state?.recipeDetails?.category.toLowerCase()}`}>{state?.recipeDetails?.category}</p>
                                <p><i>Date Added: {state?.recipeDetails?.date}</i></p>
                            </div>                           
                            <div className='editDeleteContainer'>
                                <Button variant="contained" className="editButton" startIcon={<EditIcon />} onClick={handleEdit}>
                                    Edit
                                </Button>
                                <Button variant="contained" className="deleteButton" startIcon={<DeleteIcon />} onClick={() => setOpenDialog(true)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                        <div className='imageContainer'>
                                <img className='recipeImg' src={state?.recipeDetails?.imageURL} alt="Recipe" />
                            </div>
                        <div className='ingredientsCont'>
                            <h3>Ingredients</h3>
                            <hr />
                            <ul>
                                {state?.recipeDetails?.ingredients?.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='instructionsCont'>
                            <h3>Instructions</h3>
                            <hr />
                            <ol>
                                {state?.recipeDetails?.instructions?.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this recipe?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default ViewRecipe;