import { Shield, Lock, Key, AlertTriangle, CheckCircle, Users, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SysAdminSecurityPage = () => {
  const securityMetrics = [
    {
      title: 'Active Sessions',
      value: '234',
      status: 'normal',
      description: 'Currently logged in users',
    },
    {
      title: 'Failed Logins',
      value: '12',
      status: 'warning',
      description: 'Last 24 hours',
    },
    {
      title: 'Security Events',
      value: '45',
      status: 'normal',
      description: 'This week',
    },
    {
      title: 'Blocked IPs',
      value: '8',
      status: 'normal',
      description: 'Currently blocked',
    },
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'warning',
      title: 'Multiple Failed Login Attempts',
      description: 'IP 192.168.1.100 had 5 failed login attempts',
      timestamp: '15 minutes ago',
      severity: 'medium',
    },
    {
      id: 2,
      type: 'info',
      title: 'Password Policy Updated',
      description: 'Password requirements updated to include special characters',
      timestamp: '2 hours ago',
      severity: 'low',
    },
    {
      id: 3,
      type: 'success',
      title: 'Security Scan Completed',
      description: 'Weekly security vulnerability scan completed successfully',
      timestamp: '4 hours ago',
      severity: 'low',
    },
    {
      id: 4,
      type: 'warning',
      title: 'Suspicious Activity Detected',
      description: 'Unusual access pattern from user john.doe@ksitm.edu',
      timestamp: '6 hours ago',
      severity: 'high',
    },
  ];

  const securityPolicies = [
    {
      name: 'Password Complexity',
      status: 'enabled',
      description: 'Require 8+ chars, uppercase, lowercase, numbers, special chars',
    },
    {
      name: 'Two-Factor Authentication',
      status: 'enabled',
      description: 'Required for all admin users',
    },
    {
      name: 'Session Timeout',
      status: 'enabled',
      description: 'Auto-logout after 30 minutes of inactivity',
    },
    {
      name: 'IP Whitelisting',
      status: 'disabled',
      description: 'Restrict access to specific IP ranges',
    },
    {
      name: 'Account Lockout',
      status: 'enabled',
      description: 'Lock account after 5 failed login attempts',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled': return 'default';
      case 'disabled': return 'secondary';
      case 'warning': return 'destructive';
      default: return 'outline';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'destructive';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security</h1>
          <p className="text-muted-foreground">Manage system security and access control</p>
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Security Audit
        </Button>
      </div>

      {/* Security Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <div className="mt-2">
                <Badge variant={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Security Events
          </CardTitle>
          <CardDescription>Security alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-4 border rounded-lg">
                {getEventIcon(event.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{event.title}</h4>
                    <Badge variant={getSeverityColor(event.severity)}>
                      {event.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                  <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Policies */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security Policies
            </CardTitle>
            <CardDescription>Configure security settings and policies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityPolicies.map((policy, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{policy.name}</h4>
                    <p className="text-sm text-muted-foreground">{policy.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(policy.status)}>
                      {policy.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Access Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Access Control
            </CardTitle>
            <CardDescription>Manage user permissions and access rights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Role-Based Access</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Manage permissions for different user roles
                </p>
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Roles
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">API Keys</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate and manage API access keys
                </p>
                <Button variant="outline" className="w-full">
                  <Key className="mr-2 h-4 w-4" />
                  Manage API Keys
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Audit Logs</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  View detailed security audit logs
                </p>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  View Logs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SysAdminSecurityPage;
