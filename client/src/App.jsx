import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './pages/UserForm';
import BlogList from './pages/BlogList';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
