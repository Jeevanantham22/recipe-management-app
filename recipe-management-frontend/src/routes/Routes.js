import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/login/Login';
import Registration from '../components/registration/Registration';
import { RecipeProvider } from '../services/context/recipeContext';
import { ApolloProvider } from '@apollo/client';
import client from '../services/apollo/apolloClient';
import ViewRecipe from '../components/viewRecipe/ViewRecipe';
import AddEditRecipe from '../components/addRecipe/AddEditRecipe';
import ProtectedRoutes from './ProtectedRoutes';
import { AuthProvider } from '../services/context/authContext';
import LaunchLayout from '../layouts/launchLayout/LaunchLayout';
import MainLayout from '../layouts/mainLayout/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import { NotificationsOffRounded } from '@mui/icons-material';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <ApolloProvider client={client}>
                <AuthProvider>
                    <LaunchLayout />
                </AuthProvider>
            </ApolloProvider>
        ),
        errorElement: <ErrorBoundary><h1>Not Found</h1></ErrorBoundary>,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Registration />,
            }
        ],
    },
    {
        path: '/dashboard',
        element: (
            <ApolloProvider client={client}>
                <AuthProvider>
                    <RecipeProvider>
                        <MainLayout />
                    </RecipeProvider>
                </AuthProvider>
            </ApolloProvider>
        ),
        children: [
            {
                path: '',
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: '',
                        element: <Dashboard />,
                    },
                    {
                        path: 'addRecipe',
                        element: <AddEditRecipe />,
                    },
                    {
                        path: 'editRecipe',
                        element: <AddEditRecipe />,
                    },
                    {
                        path: 'viewRecipe',
                        element: <ViewRecipe />,
                    },
                ],
            },
        ],
    },
]);

export default Routes;