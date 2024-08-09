import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/loginMutation';
import { useSnackbarContext } from '../context/snackbarContext';
import { useAuthContext } from '../context/authContext';

export const useLogin = () => {
    const navigate = useNavigate(); 
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
    const { loginAuth } = useAuthContext();     
    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

    const submitLogin = async (params) => {
        try {
            const { data, error } = await login({ variables: { input: params } });
            const { user, userToken, status } = data.login;

            if (status) {
                showSuccessSnackbar('Logged in successfully');
                loginAuth(userToken, user.id, (user.firstname+" "+user.lastname));  
                navigate('/dashboard');               
            } else {
                showErrorSnackbar(`Login failed: ${error}`);
            }
        } catch (err) {            
            showErrorSnackbar(`Login failed: ${err.message}`);
        }
    };

    return { submitLogin, data, loading, error };
};
