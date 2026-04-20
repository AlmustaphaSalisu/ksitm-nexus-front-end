import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Shield, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
] as const;

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('profile');

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground text-sm">Manage your account preferences</p>
      </div>

      <div className="flex gap-1 rounded-lg border bg-muted p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="rounded-lg border bg-card p-6 shadow-card space-y-6">
          <h3 className="font-semibold">Personal Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <Input defaultValue={user?.name} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input defaultValue={user?.email} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Department</label>
              <Input defaultValue={user?.department || 'N/A'} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Role</label>
              <Input defaultValue={user?.role} disabled />
            </div>
          </div>
          <Button className="gradient-primary border-0 text-primary-foreground" onClick={() => alert('Profile settings saved successfully!')}>Save Changes</Button>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="rounded-lg border bg-card p-6 shadow-card space-y-4">
          <h3 className="font-semibold">Notification Preferences</h3>
          {['Email notifications', 'Performance alerts', 'AI recommendations', 'System announcements'].map(item => (
            <div key={item} className="flex items-center justify-between py-3 border-b last:border-0">
              <span className="text-sm">{item}</span>
              <button className="h-6 w-11 rounded-full bg-primary transition-colors relative">
                <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-primary-foreground transition-transform" />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'security' && (
        <div className="rounded-lg border bg-card p-6 shadow-card space-y-4">
          <h3 className="font-semibold">Change Password</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Current Password</label>
              <Input type="password" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">New Password</label>
              <Input type="password" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Confirm New Password</label>
              <Input type="password" />
            </div>
            <Button className="gradient-primary border-0 text-primary-foreground" onClick={() => alert('Password updated successfully!')}>Update Password</Button>
          </div>
        </div>
      )}

      {activeTab === 'appearance' && (
        <div className="rounded-lg border bg-card p-6 shadow-card space-y-4">
          <h3 className="font-semibold">Appearance</h3>
          <p className="text-sm text-muted-foreground">Theme preferences will be available in a future update.</p>
        </div>
      )}
    </div>
  );
}
