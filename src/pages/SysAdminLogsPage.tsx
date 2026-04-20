import { FileText, Search, Filter, Download, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const SysAdminLogsPage = () => {
  const logEntries = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:25',
      level: 'error',
      service: 'Authentication',
      message: 'Failed login attempt for user john.doe@ksitm.edu',
      details: 'IP: 192.168.1.100, Reason: Invalid credentials',
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:28:15',
      level: 'warning',
      service: 'Database',
      message: 'Connection pool nearly exhausted',
      details: 'Active connections: 95/100',
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:25:42',
      level: 'info',
      service: 'API Gateway',
      message: 'Rate limit adjusted for endpoint /api/analytics',
      details: 'New limit: 1000 requests/hour',
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:20:18',
      level: 'success',
      service: 'Backup',
      message: 'Database backup completed successfully',
      details: 'Size: 2.3GB, Duration: 5m 42s',
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:15:33',
      level: 'error',
      service: 'File Storage',
      message: 'Upload failed for document_12345.pdf',
      details: 'Error: Insufficient storage space',
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'destructive';
      case 'warning': return 'destructive';
      case 'info': return 'default';
      case 'success': return 'default';
      default: return 'outline';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Info className="h-4 w-4 text-blue-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const logStats = [
    { level: 'Error', count: 23, color: 'text-red-600' },
    { level: 'Warning', count: 45, color: 'text-yellow-600' },
    { level: 'Info', count: 156, color: 'text-blue-600' },
    { level: 'Success', count: 89, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Logs</h1>
          <p className="text-muted-foreground">Monitor and analyze system activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Log Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        {logStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.level} Logs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.count}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Log Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Log Entries</CardTitle>
          <CardDescription>System activity and error logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logEntries.map((log) => (
              <div key={log.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getLevelIcon(log.level)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getLevelColor(log.level)}>
                          {log.level.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{log.service}</Badge>
                        <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                      </div>
                      <p className="font-medium">{log.message}</p>
                      <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SysAdminLogsPage;
