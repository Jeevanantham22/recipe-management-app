import React from 'react'
import './RecipeCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button as DialogButton } from '@mui/material';
import { DELETE_RECIPE } from '../../services/graphql/recipeMutation';
import { useMutation } from '@apollo/client';
import { useRecipeContext } from '../../services/context/recipeContext';

const RecipeCard = ({ recipeDetails, refetch }) => {
    const navigate = useNavigate();
    const { dispatch } = useRecipeContext();
    const [deleteRecipe] = useMutation(DELETE_RECIPE);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClick = (e) => {
        dispatch({ type: 'VIEW_DETAIL', payload: recipeDetails })
        navigate("/dashboard/viewRecipe");
    }

    const handleEdit = (e) => {
        e.stopPropagation();
        dispatch({ type: 'VIEW_DETAIL', payload: recipeDetails });
        navigate("/dashboard/editRecipe");
    }

    const handleDelete = async () => {
        try {
            await deleteRecipe({ variables: { id: recipeDetails.id } });
            if (refetch) {
                await refetch();
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        } finally {
            setOpenDialog(false);
        }
    };

    return (
        <div className='cardContainer'>
            <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
                <CardActionArea>
                    <CardMedia
                        className='cardImage'
                        component="img"
                        height="200"
                        image={recipeDetails?.imageURL}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" className="truncate">
                            {recipeDetails?.title}
                        </Typography>
                        <div className='categoryBlock'>
                            <p className={`categoryName ${recipeDetails?.category.toLowerCase()}`}>
                                {recipeDetails?.category}
                            </p>
                            <p className="recipeDate">
                                <i>{recipeDetails?.date}</i>
                            </p>
                        </div>
                        <hr />
                        <div className='editDeleteContainer'>
                            <Button variant="contained" className="editButton" startIcon={<EditIcon />} onClick={handleEdit}>
                                Edit
                            </Button>
                            <Button variant="contained" className="deleteButton" startIcon={<DeleteIcon />} onClick={(e) => {
                                e.stopPropagation();
                                setOpenDialog(true);
                            }}>
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this recipe?
                </DialogContent>
                <DialogActions>
                    <DialogButton onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </DialogButton>
                    <DialogButton onClick={handleDelete} color="secondary">
                        Delete
                    </DialogButton>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default RecipeCard;