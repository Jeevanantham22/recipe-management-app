import React from 'react';
import './Header.css';
import headerLogo from '../../assets/images/logoRecipes.png';
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../services/context/authContext';

const Header = () => {
    const navigate = useNavigate();
    const { logout } = useAuthContext();
    const userName = localStorage.getItem("userName");
    const handleLogout = async () => {
        try {
            logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };


    return (
        <div className='headerContainer'>
            <div className='headerMenuArea'>
                <img src={headerLogo} alt="Logo" />
                <div className='rightMenu'>
                    <h3>Welcome, {userName}</h3>
                    <Button variant="contained" className="logoutButton" startIcon={<LogoutIcon />} onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;
