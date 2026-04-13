import { lecturerData } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/stat-card';
import { RiskBadge } from '@/components/ui/risk-badge';
import { Users, TrendingUp, AlertTriangle, BookOpen, Brain, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const d = lecturerData;

export default function LecturerDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Welcome, Dr. Ibrahim! 👋</h2>
        <p className="text-muted-foreground text-sm">Monitor your classes and student performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={d.totalStudents} icon={Users} variant="primary" />
        <StatCard title="Average Score" value={`${d.averageClassScore}%`} icon={BarChart3} variant="info" />
        <StatCard title="Pass Rate" value={`${d.passRate}%`} icon={TrendingUp} variant="success" />
        <StatCard title="At-Risk Students" value={d.atRiskStudents} icon={AlertTriangle} variant="destructive" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance trend */}
        <div className="lg:col-span-2 rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-4">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={d.performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Legend />
              <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="attendance" name="Attendance" stroke="hsl(var(--accent))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Teaching Suggestions */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">AI Teaching Insights</h3>
          </div>
          <div className="space-y-3">
            {d.aiSuggestions.map((s, i) => (
              <div key={i} className="rounded-lg border-l-4 border-l-primary bg-primary/5 p-3">
                <p className="text-sm">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course overview */}
      <div className="rounded-lg border bg-card p-5 shadow-card">
        <h3 className="font-semibold mb-4">Course Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={d.courses}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="code" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
            <Legend />
            <Bar dataKey="avgScore" name="Avg Score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="passRate" name="Pass Rate" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* At-risk students */}
      <div className="rounded-lg border bg-card p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h3 className="font-semibold">At-Risk Students</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">Student</th>
                <th className="pb-3 font-medium">Course</th>
                <th className="pb-3 font-medium">Score</th>
                <th className="pb-3 font-medium">Attendance</th>
                <th className="pb-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {d.atRiskList.map(s => (
                <tr key={s.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 font-medium">{s.name}</td>
                  <td className="py-3">{s.course}</td>
                  <td className="py-3">{s.score}%</td>
                  <td className="py-3">{s.attendance}%</td>
                  <td className="py-3"><RiskBadge level={s.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
