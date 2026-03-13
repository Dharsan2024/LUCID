import { ReactNode } from 'react';

interface FloatingActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  delay?: number;
}

export default function FloatingActionButton({
  icon,
  label,
  onClick,
  variant = 'primary',
  delay = 0,
}: FloatingActionButtonProps) {
  const variantStyles = {
    primary: 'bg-primary/20 border-primary/30 text-primary hover:bg-primary/30 hover:shadow-[0_6px_16px_rgba(0,255,136,0.15)]',
    secondary: 'bg-accent/20 border-accent/30 text-accent hover:bg-accent/30 hover:shadow-[0_6px_16px_rgba(0,212,255,0.15)]',
    danger: 'bg-danger/20 border-danger/30 text-danger hover:bg-danger/30 hover:shadow-[0_6px_16px_rgba(239,68,68,0.15)]',
  };

  return (
    <button
      onClick={onClick}
      className={`float-action fixed bottom-8 right-8 flex items-center gap-2 px-6 py-3 rounded-xl border font-mono font-medium text-sm button-hover transition-all ${variantStyles[variant]}`}
      style={{
        animationDelay: `${delay}ms`,
      }}
      title={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
