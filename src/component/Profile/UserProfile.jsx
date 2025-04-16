
import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getUser, logout } from '../State/Authentication/Action';
import { pink } from '@mui/material/colors';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    // Access the state under the 'auth' key (the name of your reducer)
    const { user, isLoading, error } = useSelector((state) => state.auth);
    const jwt = localStorage.getItem('jwt');
    const [avatarLetter, setAvatarLetter] = useState('');

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        } else {
            // If no JWT, redirect to signup/login
            navigate('/'); // Or '/login'
        }
    }, [dispatch, jwt, navigate]);

    useEffect(() => {
        if (user?.fullName) {
            setAvatarLetter(user.fullName[0]?.toUpperCase() || '');
        } else {
            setAvatarLetter('');
        }
    }, [user]);

    console.log('User:', user); // Log the user object to check its structure

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); // Redirect after logout
    };

    const handleAvatarClick = () => {
        // You can add functionality here if you want the avatar to be clickable
        console.log('Avatar clicked!');
    };

    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <div className='flex flex-col items-center justify-center'>
                {isLoading ? (
                    <CircularProgress sx={{ fontSize: '9rem' }} />
                ) : error ? (
                    <AccountCircleIcon sx={{ fontSize: '9rem', color: 'red' }} />
                ) : user ? (
                    <Avatar onClick={handleAvatarClick} sx={{ bgcolor: 'white', color: pink[500], fontSize: '4rem', width: '9rem', height: '9rem' }}>
                        {avatarLetter}
                    </Avatar>
                ) : (
                    <AccountCircleIcon sx={{ fontSize: '9rem', color: 'grey' }} />
                )}

                {isLoading ? (
                    <CircularProgress sx={{ marginTop: '2rem' }} />
                ) : error ? (
                    <p className='py-5 text-lg text-red-500'>{error.message || 'Error loading profile'}</p>
                ) : user ? (
                    <>
                        <h1 className='py-5 text-2xl font-semibold'>{user.fullName}</h1>
                        <p className='pb-3'>{user.email}</p>
                    </>
                ) : (
                    <p className='py-5 text-lg'>Not logged in</p>
                )}
                <Button
                    variant='contained'
                    onClick={handleLogout}
                    sx={{ margin: '2rem 0rem' }}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default UserProfile;

// ... (rest of your action creators and constants remain the same)