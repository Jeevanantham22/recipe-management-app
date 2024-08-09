import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, CircularProgress } from '@mui/material';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { ADD_RECIPE, EDIT_RECIPE, GET_RECIPE, GET_RECIPES_BY_USER } from '../../services/graphql/recipeMutation';
import './AddRecipe.css';
import { useRecipeContext } from '../../services/context/recipeContext';
import { useSnackbarContext } from '../../services/context/snackbarContext';

const AddEditRecipe = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useRecipeContext();  
  const userId = localStorage.getItem("userId");
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const [initialValues, setInitialValues] = useState({
    title: '',
    category: '',
    ingredients: [''],
    instructions: [''],
    date: '',
    imageURL: '',
  });
  const { refetch } = useQuery(GET_RECIPES_BY_USER, {
    variables: { userId },
    skip: true, 
  });
  const [addRecipe] = useMutation(ADD_RECIPE);
  const [editRecipe] = useMutation(EDIT_RECIPE); 
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { id: state?.recipeDetails?.id },
    skip: !state?.recipeDetails?.id,
  });

  useEffect(() => {
    if (data && data.recipe) {
      setInitialValues({
        title: data.recipe.title,
        category: data.recipe.category,
        ingredients: data.recipe.ingredients,
        instructions: data.recipe.instructions,
        date: data.recipe.date,
        imageURL: data.recipe.imageURL,
      });
    }
  }, [data]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    ingredients: Yup.array()
      .of(Yup.string().required('Ingredient is required'))
      .required('At least one ingredient is required'),
    instructions: Yup.array()
      .of(Yup.string().required('Instruction is required'))
      .required('At least one instruction is required'),
    date: Yup.string().required('Date is required'),
    imageURL: Yup.string().required('Image URL is required'),
  });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading recipe data</p>;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (state?.recipeDetails?.id) {
        const result = await editRecipe({ variables: { id: state?.recipeDetails?.id, input: values } });
        if (result) {
          showSuccessSnackbar('Recipe edited successfully');
          dispatch({ type: 'EDIT_RECIPE', payload: { id: state?.recipeDetails?.id, ...values } });
          navigate("/dashboard");
        }
      } else {
        const result = await addRecipe({ variables: { input: values } });
        await refetch();
        if (result) {         
          showSuccessSnackbar('Recipe added successfully');
          dispatch({ type: 'ADD_RECIPE', payload: result.data.addRecipe });
          navigate("/dashboard");
        } else {
          showErrorSnackbar('Error saving recipe', result);
        }
      }             
    } catch (error) {
      showErrorSnackbar('Error saving recipe', error);              
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="addRecipeContainer">
      <div className="addRecipeFormContainer">
        <h2>{state?.recipeDetails?.id ? 'Edit Recipe' : 'Add Recipe'}</h2><br />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <div className="fieldContainer">
                <label>Title</label>
                <Field
                  as={TextField}
                  name="title"
                  placeholder="Title"
                  fullWidth
                  variant="outlined"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </div>

              <div className="fieldContainer">
                <label>Category</label>
                <FormControl fullWidth variant="outlined" error={touched.category && Boolean(errors.category)}>
                  <Field
                    as={Select}
                    name="category"
                    placeholder="Category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    displayEmpty
                  >
                    <MenuItem value=""><span style={{color: "gray"}} >Select Category</span></MenuItem>
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" />
                </FormControl>
              </div>

              
              <div className="fieldContainer ingredients">
              <label>Ingredients</label>
                <FieldArray name="ingredients">
                  {({ push, remove }) => (
                    <div>
                      {values.ingredients.map((ingredient, index) => (
                        <div className="ingredientContainer" key={index}>
                          <TextField
                            name={`ingredients.${index}`}
                            placeholder={`Ingredient ${index + 1}`}
                            fullWidth
                            variant="outlined"
                            value={ingredient}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.ingredients && Boolean(errors.ingredients && errors.ingredients[index])}
                            helperText={touched.ingredients && errors.ingredients && errors.ingredients[index]}
                          />
                          <Button type="button" startIcon={<RemoveCircleOutlineIcon />} onClick={() => remove(index)}></Button>
                        </div>
                      ))}
                      <Button type="button" onClick={() => push('')} startIcon={<ControlPointIcon />}>Add Ingredient</Button>
                    </div>
                  )}
                </FieldArray>
              </div>


              <div className="fieldContainer">
              <label>Instructions</label>
                <FieldArray name="instructions">
                  {({ push, remove }) => (
                    <div>
                      {values.instructions.map((instruction, index) => (
                        <div className="ingredientContainer" key={index}>
                          <TextField
                            name={`instructions.${index}`}
                            placeholder={`Instruction ${index + 1}`}
                            fullWidth
                            variant="outlined"
                            value={instruction}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.instructions && Boolean(errors.instructions && errors.instructions[index])}
                            helperText={touched.instructions && errors.instructions && errors.instructions[index]}
                          />
                          <Button type="button" startIcon={<RemoveCircleOutlineIcon />} onClick={() => remove(index)}></Button>
                        </div>
                      ))}
                      <Button type="button" onClick={() => push('')} startIcon={<ControlPointIcon />}>Add Instruction</Button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className="fieldContainer">
                <label>Date</label>
                <Field
                  as={TextField}
                  name="date"
                  placeholder="Date: dd/mm/yyyy"
                  fullWidth
                  variant="outlined"
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              </div>

              <div className="fieldContainer">
                <label>Image URL</label>
                <Field
                  as={TextField}
                  name="imageURL"
                  placeholder="Image URL"
                  fullWidth
                  variant="outlined"
                  error={touched.imageURL && Boolean(errors.imageURL)}
                  helperText={touched.imageURL && errors.imageURL}
                />
              </div>

              <Button type="submit" className="addEditButton" variant="contained" color="primary">
                {state?.recipeDetails?.id ? 'Save Changes' : 'Add Recipe'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddEditRecipe;