import { Video as LucideIcon } from 'lucide-react';
import GlassCard from './GlassCard';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subValue?: string;
  gradient?: string;
}

export default function StatCard({ icon: Icon, label, value, subValue, gradient = 'from-iga-purple to-iga-magenta' }: StatCardProps) {
  return (
    <GlassCard>
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center flex-shrink-0`}>
          <Icon className="text-white" size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-2xl font-bold gradient-text">{value}</p>
          {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
        </div>
      </div>
    </GlassCard>
  );
}
