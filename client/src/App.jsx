import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import UserForm from './pages/UserForm';
import BlogList from './pages/BlogList';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer'; // import Footer
import { useEffect, useState } from 'react';

function AppWrapper() {
  const location = useLocation();
  const hideFooterOn = ['/admin', '/admin-login']; // no footer on admin pages

  const shouldHideFooter = hideFooterOn.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!shouldHideFooter && <Footer />} {/* Footer on all user pages */}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;



