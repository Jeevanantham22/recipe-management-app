import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import './Login.css';
import loginBg from '../../assets/images/loginBg.jpg';
import logo from '../../assets/images/logoRecipes.png';
import { NavLink } from 'react-router-dom';
import { useLogin } from '../../services/login/login';

const Login = () => {
    const { submitLogin } = useLogin();
    const validationSchema = yup.object({
        userName: yup
            .string('Enter your email')
            .required('Username is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required')
            .matches(/[a-z]/, "Must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Must contain at least one uppercase letter")
            .matches(/[0-9]/, "Must contain at least one number")
            .matches(/[!@#\$%\^&\*]/, "Must contain at least one special character"),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitLogin(values);
        },
    });

    return (
        <div className='outerContainer' style={{
            backgroundImage: `url(${loginBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className='loginContainer'>
                <div className='loginForm'>
                    <img className="loginLogo" src={logo} />
                    <h1>Login</h1>
                    <h3>Recipe Management Application</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField className='textField'
                            fullWidth
                            variant="outlined"
                            id="userName"
                            name="userName"
                            placeholder="Username"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        />
                        <TextField className='textField'
                            fullWidth
                            variant="outlined"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button className="loginButton" color="primary" variant="contained" fullWidth type="submit">
                            Login
                        </Button>
                    </form>
                    <h4>Do you have an account? <NavLink to="/register">Sign Up</NavLink></h4>
                </div>
            </div>
        </div>
    );
};

export default Login;
