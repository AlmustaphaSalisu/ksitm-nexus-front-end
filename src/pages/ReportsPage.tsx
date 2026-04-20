import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar, Filter } from 'lucide-react';

const reports = [
  { title: 'Student Performance Report', desc: 'Comprehensive analysis of student grades and GPA trends', date: '2024-01-15', type: 'Academic' },
  { title: 'Attendance Summary', desc: 'Monthly attendance records across all departments', date: '2024-01-14', type: 'Attendance' },
  { title: 'AI Risk Assessment Report', desc: 'Students flagged for dropout risk with intervention recommendations', date: '2024-01-13', type: 'AI Analytics' },
  { title: 'Teaching Quality Report', desc: 'Lecturer performance metrics and student feedback analysis', date: '2024-01-12', type: 'Quality' },
  { title: 'Department Comparison', desc: 'Cross-department performance benchmarking', date: '2024-01-11', type: 'Institutional' },
  { title: 'Enrollment Trends', desc: 'Year-over-year enrollment and retention analysis', date: '2024-01-10', type: 'Institutional' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Reports</h2>
          <p className="text-muted-foreground text-sm">Generate and download academic reports</p>
        </div>
        <Button className="gradient-primary border-0 text-primary-foreground" onClick={() => alert('New report generation functionality would be implemented here')}>
          <FileText className="h-4 w-4 mr-1.5" /> Generate New Report
        </Button>
      </div>

      <div className="grid gap-4">
        {reports.map((r, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border bg-card p-5 shadow-card hover:shadow-elevated transition-all">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {r.date}
                  </span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">{r.type}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => alert('PDF export functionality would be implemented here')}><Download className="h-4 w-4 mr-1" /> PDF</Button>
              <Button variant="outline" size="sm" onClick={() => alert('Excel export functionality would be implemented here')}><Download className="h-4 w-4 mr-1" /> Excel</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
