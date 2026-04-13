import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { roleLabels } from '@/lib/mock-data';
import { notifications } from '@/lib/mock-data';
import {
  LayoutDashboard, BookOpen, Users, BarChart3, Brain, FileText, Settings,
  Bell, LogOut, Menu, X, ChevronDown, GraduationCap, UserCheck,
  Building, Shield, Activity, Upload, ClipboardList, MessageSquare,
  Server, Database, Key, Gauge,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const roleNavItems = {
  student: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/dashboard/courses' },
    { label: 'Performance', icon: BarChart3, path: '/dashboard/analytics' },
    { label: 'AI Insights', icon: Brain, path: '/dashboard/ai-insights' },
    { label: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ],
  lecturer: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Classes', icon: BookOpen, path: '/dashboard/courses' },
    { label: 'Students', icon: Users, path: '/dashboard/students' },
    { label: 'Attendance', icon: ClipboardList, path: '/dashboard/attendance' },
    { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { label: 'AI Insights', icon: Brain, path: '/dashboard/ai-insights' },
    { label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
    { label: 'Reports', icon: FileText, path: '/dashboard/reports' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ],
  hod: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Courses', icon: BookOpen, path: '/dashboard/courses' },
    { label: 'Lecturers', icon: UserCheck, path: '/dashboard/lecturers' },
    { label: 'Students', icon: Users, path: '/dashboard/students' },
    { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { label: 'AI Insights', icon: Brain, path: '/dashboard/ai-insights' },
    { label: 'Reports', icon: FileText, path: '/dashboard/reports' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ],
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Departments', icon: Building, path: '/dashboard/departments' },
    { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { label: 'AI Predictions', icon: Brain, path: '/dashboard/ai-insights' },
    { label: 'Reports', icon: FileText, path: '/dashboard/reports' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ],
  sysadmin: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'User Management', icon: Users, path: '/dashboard/users' },
    { label: 'System Health', icon: Activity, path: '/dashboard/health' },
    { label: 'Logs', icon: Server, path: '/dashboard/logs' },
    { label: 'Database', icon: Database, path: '/dashboard/database' },
    { label: 'Security', icon: Shield, path: '/dashboard/security' },
    { label: 'API Config', icon: Key, path: '/dashboard/api' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ],
};

const roleIcons = {
  student: GraduationCap,
  lecturer: BookOpen,
  hod: Building,
  admin: Gauge,
  sysadmin: Shield,
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  if (!user) return null;

  const navItems = roleNavItems[user.role];
  const RoleIcon = roleIcons[user.role];
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:relative',
        sidebarOpen ? 'w-64' : 'w-[70px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className={cn('flex items-center gap-3 border-b border-sidebar-border px-4 h-16', !sidebarOpen && 'justify-center px-2')}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in">
              <p className="text-sm font-bold">KSITM Analytics</p>
              <p className="text-[10px] text-sidebar-muted">AI-Powered Platform</p>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                  !sidebarOpen && 'justify-center px-2'
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                {sidebarOpen && <span className="animate-fade-in">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className={cn('border-t border-sidebar-border p-3', !sidebarOpen && 'flex justify-center')}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
                <RoleIcon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-[11px] text-sidebar-muted">{roleLabels[user.role]}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
              <RoleIcon className="h-4 w-4" />
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden rounded-lg p-2 hover:bg-muted">
              <Menu className="h-5 w-5" />
            </button>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex rounded-lg p-2 hover:bg-muted">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">
                {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-muted-foreground">{user.department || 'KSITM'} • {roleLabels[user.role]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative rounded-lg p-2 hover:bg-muted">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border bg-card shadow-elevated animate-slide-up">
                  <div className="border-b p-3">
                    <p className="text-sm font-semibold">Notifications</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={cn('border-b p-3 last:border-0', !n.read && 'bg-primary/5')}>
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
