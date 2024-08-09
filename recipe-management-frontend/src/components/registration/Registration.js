import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import './Registration.css'
import loginBg from '../../assets/images/loginBg.jpg'
import { useRegister } from '../../services/login/register';
import { NavLink } from 'react-router-dom';

const Registration = () => {
    const { submitRegister } = useRegister();

    const validationSchema = yup.object({
        firstname: yup
            .string('Enter your Firstname')
            .required('Firstname is required'),
        lastname: yup
            .string('Enter your Lastname')
            .required('Lastname is required'),
        userName: yup
            .string('Enter your Username')
            .required('Username is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
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
            firstname: '',
            lastname: '',
            userName: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitRegister(values);
        },
    });

    return (
        <div className='outerContainer' style={{
            backgroundImage: `url(${loginBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className='loginContainer'>
                <div className='registerForm'>                   
                    <h1>Register</h1>
                    <h3>Create your account</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField className='textField'
                            fullWidth
                            variant="outlined"
                            id="firstname"
                            name="firstname"
                            placeholder="Firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.touched.firstname && formik.errors.firstname}
                        />
                        <TextField className='textField'
                            fullWidth
                            variant="outlined"
                            id="lastname"
                            name="lastname"
                            placeholder="Lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                        />
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
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
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
                        <Button className="registerButton" color="primary" variant="contained" fullWidth type="submit">
                            Register
                        </Button>
                    </form>
                    <h4>Already have an account? <NavLink to="/">Login</NavLink></h4>
                </div>
            </div>
        </div>
    );
};

export default Registration;





