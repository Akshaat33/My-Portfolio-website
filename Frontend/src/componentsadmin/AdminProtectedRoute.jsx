import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import api from '../services/api'

const AdminProtectedRoute = () => {
    const [status, setStatus] = useState('checking');
    useEffect(() => {
        const verifyAdmin = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setStatus('denied');
                return;
            }
            try {
                const response = await api.get('/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (
                    response.data.success &&
                    response.data.user?.role === 'admin'
                ) {
                    setStatus('allowed');
                } else {
                    setStatus('denied');
                }
            } catch (error) {
                setStatus('denied');
            }
        };
        verifyAdmin();
    }, [])
     if (status === 'checking') {
        return <p>Verifying admin access...</p>;
    }
    if (status === 'denied') {
        return <Navigate to="/admin-sign-in" replace />;
    }
    return <Outlet />;
}

export default AdminProtectedRoute
