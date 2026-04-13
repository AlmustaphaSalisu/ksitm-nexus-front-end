import { cn } from '@/lib/utils';

type RiskLevel = 'low' | 'medium' | 'high';

const riskStyles: Record<RiskLevel, string> = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
};

const riskLabels: Record<RiskLevel, string> = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold', riskStyles[level], className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', level === 'low' ? 'bg-success' : level === 'medium' ? 'bg-warning' : 'bg-destructive')} />
      {riskLabels[level]}
    </span>
  );
}
