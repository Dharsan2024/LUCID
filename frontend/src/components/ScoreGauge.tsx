import { getScoreColor } from '../utils/helpers';
import { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function ScoreGauge({
  score,
  size = 180,
  strokeWidth = 12,
  label,
}: ScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score * circumference;
  const color = getScoreColor(score);
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const targetPercentage = Math.round(score * 100);

  // Animate the percentage counter
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      start = Math.floor(targetPercentage * progress);
      setDisplayPercentage(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [targetPercentage]);

  return (
    <div className="flex flex-col items-center gap-3 hover-glow-score cursor-default">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-surface-lighter"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle with needle sweep animation */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="gauge-needle transition-all duration-200 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px ${color}50)`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-bold font-mono tabular-nums"
            style={{ color }}
          >
            {displayPercentage}
          </span>
          <span className="text-xs text-text-muted font-mono uppercase tracking-wider">
            percent
          </span>
        </div>
      </div>
      {label && (
        <span
          className="text-sm font-semibold font-mono px-3 py-1 rounded-full border"
          style={{ color, backgroundColor: `${color}10`, borderColor: `${color}30` }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
