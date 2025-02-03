import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useNavigate 
} from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from '@/pages/LandingPage';
import Overview from '@/pages/common/overview/Overview';

import Logs from '@/pages/student/logs/Logs';
import LogsWithReview from '@/pages/student/reviews/Logs';
import Supervisors from '@/pages/student/supervisors/Supervisors';
import Interns from './pages/industry-supervisor/interns/Intern';
import Students from './pages/school-supervisor/students/students';
import Profile from './pages/common/profile/Profile';
import { DataProvider } from './context/DataContext';
import InternsListForLogs from './pages/industry-supervisor/interns-log/Page';
import IndustrySupervisorInternLogs from './pages/industry-supervisor/interns-log/logs/Logs';
import SchoolSupervisorListForLogs from './pages/school-supervisor/students-log/Page';
import SchoolSupervisorStudentLogs from './pages/school-supervisor/students-log/logs/Logs';

import InternsListForReviews from './pages/industry-supervisor/students-reviews/Page';
import IndustrySupervisorInternReviews from './pages/industry-supervisor/students-reviews/reviews/Logs';
import SchoolSupervisorListForReviews from './pages/school-supervisor/students-reviews/Page';
import SchoolSupervisorStudentReviews from './pages/school-supervisor/students-reviews/reviews/Logs';

// Error Pages
import NotFoundPage from '@/pages/error/404.page';
import UnauthorizedPage from '@/pages/error/401.page';

// Axios Client and Interceptors
import { setupAxiosInterceptors } from './interceptor/axios.interceptor';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Protected Routes for All Authenticated Users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/engine/overview" element={<Overview />} />
            <Route path="/engine/logs" element={<Logs />} />
            <Route path="/engine/reviews" element={<LogsWithReview />} />
            <Route path="/engine/supervisors" element={<Supervisors />} />
            <Route path="/engine/interns" element={<Interns />} />
            <Route path="/engine/students" element={<Students />} />
            <Route path="/engine/profile" element={<Profile />} />
            <Route path="/engine/interns-logs" element={<InternsListForLogs />} />
            <Route path="/engine/interns-logs/:id" element={<IndustrySupervisorInternLogs />} />
            <Route path="/engine/students-logs" element={<SchoolSupervisorListForLogs />} />
            <Route path="/engine/students-logs/:id" element={<SchoolSupervisorStudentLogs />} />

            <Route path="/engine/supervisor-industry-reviews" element={<InternsListForReviews />} />
            <Route path="/engine/supervisor-industry-reviews/:id" element={<IndustrySupervisorInternReviews />} />
            <Route path="/engine/supervisor-school-reviews" element={<SchoolSupervisorListForReviews />} />
            <Route path="/engine/supervisor-school-reviews/:id" element={<SchoolSupervisorStudentReviews />} />
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
};

const Root: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default Root;
