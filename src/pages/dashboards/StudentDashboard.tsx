import { studentPerformance } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/stat-card';
import { RiskBadge } from '@/components/ui/risk-badge';
import { GraduationCap, TrendingUp, Calendar, BookOpen, Brain, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const d = studentPerformance;

const priorityStyles = {
  high: 'border-l-destructive bg-destructive/5',
  medium: 'border-l-warning bg-warning/5',
  low: 'border-l-success bg-success/5',
};

export default function StudentDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Amina! 👋</h2>
          <p className="text-muted-foreground text-sm">Here's your academic performance overview</p>
        </div>
        <RiskBadge level={d.riskLevel} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Current GPA" value={d.gpa} subtitle={`CGPA: ${d.cgpa}`} icon={GraduationCap} variant="primary" trend={{ value: '+0.13', positive: true }} />
        <StatCard title="Attendance" value={`${d.attendance}%`} subtitle="This semester" icon={Calendar} variant="success" />
        <StatCard title="Courses" value={d.totalCourses} subtitle="Active enrollment" icon={BookOpen} variant="info" />
        <StatCard title="Credits" value={`${d.completedCredits}/${d.totalCredits}`} subtitle="Completed" icon={TrendingUp} variant="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* GPA Trend */}
        <div className="lg:col-span-2 rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-4">GPA Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={d.gpaHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="semester" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[2, 4]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Line type="monotone" dataKey="gpa" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: 'hsl(var(--primary))', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {d.aiRecommendations.map((rec, i) => (
              <div key={i} className={`rounded-lg border-l-4 p-3 ${priorityStyles[rec.priority]}`}>
                <div className="flex items-start gap-2">
                  {rec.type === 'study' && <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />}
                  {rec.type === 'resource' && <Lightbulb className="h-4 w-4 text-warning mt-0.5 shrink-0" />}
                  {rec.type === 'attendance' && <Calendar className="h-4 w-4 text-destructive mt-0.5 shrink-0" />}
                  {rec.type === 'strength' && <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />}
                  <p className="text-sm">{rec.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Performance */}
      <div className="rounded-lg border bg-card p-5 shadow-card">
        <h3 className="font-semibold mb-4">Course Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">Course</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Score</th>
                <th className="pb-3 font-medium">Grade</th>
                <th className="pb-3 font-medium">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {d.courses.map(c => (
                <tr key={c.code} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-3 font-medium text-primary">{c.code}</td>
                  <td className="py-3">{c.name}</td>
                  <td className="py-3">{c.score}%</td>
                  <td className="py-3"><span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{c.grade}</span></td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-success" style={{ width: `${c.attendance}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{c.attendance}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
