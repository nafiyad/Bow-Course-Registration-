import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import ProgramListingPage from './components/pages/ProgramListingPage';
import CourseCatalogPage from './components/pages/CourseCatalogPage';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import AdminRegistrationPage from './components/auth/AdminRegistrationPage';
import StudentRegistrationPage from './components/auth/StudentRegistrationPage';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentDashboard from './components/student/StudentDashboard';

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useUserContext();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (allowedRoles.includes(currentUser.role)) return children;
  return <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin-register" element={<AdminRegistrationPage />} />
        <Route path="/student-register" element={<StudentRegistrationPage />} />
        <Route path="/programs" element={<ProgramListingPage />} />
        <Route path="/courses" element={<CourseCatalogPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'student']}>
              <DashboardRouter />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Layout>
  );
}

function DashboardRouter() {
  const { currentUser } = useUserContext();
  return currentUser.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
}

export default AppRoutes;
