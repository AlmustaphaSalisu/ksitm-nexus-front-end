import { Activity, Server, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SysAdminSystemHealthPage = () => {
  const systemMetrics = [
    {
      title: 'CPU Usage',
      value: '45%',
      status: 'healthy',
      change: '+5%',
      trend: 'up',
      icon: Cpu,
      description: 'Average over last hour',
    },
    {
      title: 'Memory Usage',
      value: '67%',
      status: 'warning',
      change: '+12%',
      trend: 'up',
      icon: Server,
      description: '8.2GB of 12GB used',
    },
    {
      title: 'Disk Space',
      value: '78%',
      status: 'healthy',
      change: '+2%',
      trend: 'up',
      icon: HardDrive,
      description: '234GB of 300GB used',
    },
    {
      title: 'Network',
      value: '92%',
      status: 'healthy',
      change: '-3%',
      trend: 'down',
      icon: Wifi,
      description: '1.2 Gbps throughput',
    },
  ];

  const services = [
    {
      name: 'Database Server',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '45ms',
      lastCheck: '2 minutes ago',
    },
    {
      name: 'API Gateway',
      status: 'healthy',
      uptime: '99.8%',
      responseTime: '120ms',
      lastCheck: '1 minute ago',
    },
    {
      name: 'Authentication Service',
      status: 'healthy',
      uptime: '100%',
      responseTime: '25ms',
      lastCheck: '30 seconds ago',
    },
    {
      name: 'File Storage',
      status: 'warning',
      uptime: '98.5%',
      responseTime: '350ms',
      lastCheck: '5 minutes ago',
    },
    {
      name: 'Email Service',
      status: 'healthy',
      uptime: '99.7%',
      responseTime: '180ms',
      lastCheck: '3 minutes ago',
    },
    {
      name: 'Cache Server',
      status: 'healthy',
      uptime: '100%',
      responseTime: '5ms',
      lastCheck: '15 seconds ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'warning': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Health</h1>
          <p className="text-muted-foreground">Monitor system performance and service status</p>
        </div>
        <Badge variant="outline">Last updated: 1 min ago</Badge>
      </div>

      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <metric.icon className="h-4 w-4" />
                {metric.title}
              </CardTitle>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {metric.change}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <div className="mt-2">
                <Badge variant={getStatusColor(metric.status)}>
                  {getStatusIcon(metric.status)}
                  {metric.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Service Status
          </CardTitle>
          <CardDescription>Health check of all system services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(service.status)}
                  <div>
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">Last check: {service.lastCheck}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="font-semibold">{service.uptime}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="font-semibold">{service.responseTime}</p>
                  </div>
                  <Badge variant={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Active Alerts
            </CardTitle>
            <CardDescription>System warnings and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'warning', message: 'Memory usage approaching threshold', time: '15 minutes ago' },
                { type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago' },
                { type: 'warning', message: 'File storage response time elevated', time: '2 hours ago' },
              ].map((alert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <AlertTriangle className={`h-4 w-4 ${
                    alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Events
            </CardTitle>
            <CardDescription>System activity log</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { event: 'Database backup completed', time: '30 minutes ago', status: 'success' },
                { event: 'API rate limit adjusted', time: '1 hour ago', status: 'info' },
                { event: 'Security patch applied', time: '3 hours ago', status: 'success' },
                { event: 'Cache cleared', time: '4 hours ago', status: 'info' },
                { event: 'Service restart: File Storage', time: '6 hours ago', status: 'warning' },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                  <Badge variant={event.status === 'success' ? 'default' : 'outline'}>
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SysAdminSystemHealthPage;
