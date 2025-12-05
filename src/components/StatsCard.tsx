import { ReactNode } from 'react';
import AnimatedCounter from './AnimatedCounter';
import GlowCard from './GlowCard';

interface StatsCardProps {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: ReactNode;
  color: 'primary' | 'secondary' | 'accent';
  delay?: number;
}

const StatsCard = ({ label, value, suffix = '', decimals = 0, icon, color, delay = 0 }: StatsCardProps) => {
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
  };

  const bgClasses = {
    primary: 'from-primary/20 to-primary/5 border-primary/30',
    secondary: 'from-secondary/20 to-secondary/5 border-secondary/30',
    accent: 'from-accent/20 to-accent/5 border-accent/30',
  };

  return (
    <GlowCard 
      glowColor={color} 
      className="animate-slide-up"
      style={{ animationDelay: `${delay}s` } as React.CSSProperties}
    >
      <div className="glass-card p-5 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgClasses[color]} border flex items-center justify-center flex-shrink-0`}>
          <div className={colorClasses[color]}>
            {icon}
          </div>
        </div>
        <div>
          <p className={`text-2xl font-bold ${colorClasses[color]}`}>
            <AnimatedCounter value={value} suffix={suffix} decimals={decimals} />
          </p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </GlowCard>
  );
};

export default StatsCard;
