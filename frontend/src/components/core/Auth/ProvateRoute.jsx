/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setToken } from '../../../slices/authSlice';

const PrivateRoute = ({ children }) => {
    const dispatch=useDispatch()
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
    // dispatchEvent(setToken(token))
    console.log(token, "token for pr");
    if (token !== null) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default PrivateRoute;
