import { Database, HardDrive, Search, Filter, Download, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const SysAdminDatabasePage = () => {
  const databaseStats = [
    {
      title: 'Total Size',
      value: '2.3 GB',
      change: '+0.2 GB',
      trend: 'up',
      description: 'Database storage used',
    },
    {
      title: 'Tables',
      value: '47',
      change: '+2',
      trend: 'up',
      description: 'Total tables',
    },
    {
      title: 'Records',
      value: '1.2M',
      change: '+15K',
      trend: 'up',
      description: 'Total records',
    },
    {
      title: 'Connections',
      value: '23',
      change: '-5',
      trend: 'down',
      description: 'Active connections',
    },
  ];

  const tables = [
    {
      name: 'users',
      records: 1234,
      size: '45.2 MB',
      lastModified: '2 hours ago',
      status: 'healthy',
    },
    {
      name: 'courses',
      records: 45,
      size: '2.1 MB',
      lastModified: '1 day ago',
      status: 'healthy',
    },
    {
      name: 'attendance',
      records: 8967,
      size: '123.5 MB',
      lastModified: '5 minutes ago',
      status: 'healthy',
    },
    {
      name: 'grades',
      records: 5678,
      size: '67.8 MB',
      lastModified: '30 minutes ago',
      status: 'healthy',
    },
    {
      name: 'logs',
      records: 45678,
      size: '890.2 MB',
      lastModified: '1 minute ago',
      status: 'warning',
    },
  ];

  const recentBackups = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:00',
      type: 'Full Backup',
      size: '2.3 GB',
      status: 'completed',
      duration: '5m 42s',
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:00:00',
      type: 'Incremental',
      size: '156 MB',
      status: 'completed',
      duration: '1m 23s',
    },
    {
      id: 3,
      timestamp: '2024-01-15 06:00:00',
      type: 'Full Backup',
      size: '2.1 GB',
      status: 'completed',
      duration: '6m 15s',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'warning': return 'destructive';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Database className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Database Management</h1>
          <p className="text-muted-foreground">Monitor and manage database operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Backup Now
          </Button>
        </div>
      </div>

      {/* Database Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {databaseStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Database Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Tables
            </CardTitle>
            <CardDescription>Overview of all database tables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tables.map((table, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(table.status)}
                    <div>
                      <h4 className="font-semibold">{table.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {table.records.toLocaleString()} records
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{table.size}</p>
                    <p className="text-xs text-muted-foreground">{table.lastModified}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Backups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Recent Backups
            </CardTitle>
            <CardDescription>Database backup history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBackups.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{backup.type}</h4>
                    <p className="text-sm text-muted-foreground">{backup.timestamp}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{backup.size}</Badge>
                      <Badge variant="outline">{backup.duration}</Badge>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(backup.status)}>
                    {backup.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Operations */}
      <Card>
        <CardHeader>
          <CardTitle>Database Operations</CardTitle>
          <CardDescription>Perform database maintenance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Optimization</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Optimize database performance and clean up unused data
              </p>
              <Button variant="outline" className="w-full">
                Optimize Database
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Maintenance</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Run integrity checks and repair operations
              </p>
              <Button variant="outline" className="w-full">
                Run Maintenance
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Analytics</h4>
              <p className="text-sm text-muted-foreground mb-3">
                View detailed database analytics and reports
              </p>
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SysAdminDatabasePage;
