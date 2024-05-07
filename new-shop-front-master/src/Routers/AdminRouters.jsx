import React from 'react'
import Admin from '../Admin/Admin';
import {Route , Routes } from 'react-router-dom';

const AdminRouters = () => {
    return (
        <Routes>
            <Route path='/*' element={<Admin/>} />
        </Routes>
        
    )
}
export default AdminRouters;