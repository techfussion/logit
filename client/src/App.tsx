import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from '@/pages/LandingPage';
// Generat (Student, Industry Supervisor, School Supervisor) Pages
import Overview from '@/pages/overview/Overview';

// Student Pages
import Logs from '@/pages/logs/Logs';
import LogsWithReview from '@/pages/reviews/Logs';
import Supervisors from '@/pages/supervisors/Supervisors';
import Profile from './pages/profile/Profile';
import { DataProvider } from './context/dataContext';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}

            {/* Protected Routes for All Authenticated Users */}
            <Route element={<ProtectedRoute />}>
              <Route path="/engine/overview" element={<Overview />} />
              <Route path="/engine/logs" element={<Logs />} />
              <Route path="/engine/reviews" element={<LogsWithReview />} />
              <Route path="/engine/supervisors" element={<Supervisors />} />
              <Route path="/engine/interns" element={<Supervisors />} />
              <Route path="/engine/students" element={<Supervisors />} />
              <Route path="/engine/profile" element={<Profile />} />
            </Route>

          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;