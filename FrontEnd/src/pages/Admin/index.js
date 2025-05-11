import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import SongManagement from './SongManagement';
import UserManagement from './UserManagement';

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/songs" element={<SongManagement />} />
      <Route path="/users" element={<UserManagement />} />
    </Routes>
  );
};

export default Admin; 