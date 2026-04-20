import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AIInsightsPage from "./pages/AIInsightsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
// Lecturer pages
import LecturerClassesPage from "./pages/LecturerClassesPage";
import LecturerStudentsPage from "./pages/LecturerStudentsPage";
import LecturerAttendancePage from "./pages/LecturerAttendancePage";
import LecturerAnalyticsPage from "./pages/LecturerAnalyticsPage";
import LecturerMessagesPage from "./pages/LecturerMessagesPage";
// System Admin pages
import SysAdminUsersPage from "./pages/SysAdminUsersPage";
import SysAdminSystemHealthPage from "./pages/SysAdminSystemHealthPage";
import SysAdminLogsPage from "./pages/SysAdminLogsPage";
import SysAdminDatabasePage from "./pages/SysAdminDatabasePage";
import SysAdminSecurityPage from "./pages/SysAdminSecurityPage";
import SysAdminAPIPage from "./pages/SysAdminAPIPage";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            
            {/* Lecturer Routes */}
            <Route path="/dashboard/courses" element={<ProtectedRoute><LecturerClassesPage /></ProtectedRoute>} />
            <Route path="/dashboard/students" element={<ProtectedRoute><LecturerStudentsPage /></ProtectedRoute>} />
            <Route path="/dashboard/attendance" element={<ProtectedRoute><LecturerAttendancePage /></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute><LecturerAnalyticsPage /></ProtectedRoute>} />
            <Route path="/dashboard/messages" element={<ProtectedRoute><LecturerMessagesPage /></ProtectedRoute>} />
            
            {/* System Admin Routes */}
            <Route path="/dashboard/users" element={<ProtectedRoute><SysAdminUsersPage /></ProtectedRoute>} />
            <Route path="/dashboard/health" element={<ProtectedRoute><SysAdminSystemHealthPage /></ProtectedRoute>} />
            <Route path="/dashboard/logs" element={<ProtectedRoute><SysAdminLogsPage /></ProtectedRoute>} />
            <Route path="/dashboard/database" element={<ProtectedRoute><SysAdminDatabasePage /></ProtectedRoute>} />
            <Route path="/dashboard/security" element={<ProtectedRoute><SysAdminSecurityPage /></ProtectedRoute>} />
            <Route path="/dashboard/api" element={<ProtectedRoute><SysAdminAPIPage /></ProtectedRoute>} />
            
            {/* Existing Routes */}
            <Route path="/dashboard/ai-insights" element={<ProtectedRoute><AIInsightsPage /></ProtectedRoute>} />
            <Route path="/dashboard/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            
            {/* Catch-all */}
            <Route path="/dashboard/*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
