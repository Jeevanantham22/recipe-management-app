import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../graphql/loginMutation.js';
import { useSnackbarContext } from '../context/snackbarContext.js';

export const useRegister = () => {
    const navigate = useNavigate();
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
    const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

    const submitRegister = async (params) => {        
        try {
            const response = await register({ variables: { input: params } });
            const { status } = response.data.register;            
            if(status) { 
              showSuccessSnackbar('User registered successfully');
                navigate('/');
            }else {
              showErrorSnackbar(`Registration failed: ${error.message}`);
          }
          } catch (err) {
            showErrorSnackbar(`Registration failed: ${error}`);            
          }
    
    }
 
  return { submitRegister }
}
