import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './dashboards/StudentDashboard';
import LecturerDashboard from './dashboards/LecturerDashboard';
import HodDashboard from './dashboards/HodDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import SysAdminDashboard from './dashboards/SysAdminDashboard';
import { Navigate } from 'react-router-dom';

export default function DashboardPage() {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  switch (role) {
    case 'student': return <StudentDashboard />;
    case 'lecturer': return <LecturerDashboard />;
    case 'hod': return <HodDashboard />;
    case 'admin': return <AdminDashboard />;
    case 'sysadmin': return <SysAdminDashboard />;
    default: return <Navigate to="/login" />;
  }
}
