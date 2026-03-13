interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export default function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#00ff88',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(30, 45, 61, 0.5)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="progress-ring transition-all duration-300"
          style={{
            filter: `drop-shadow(0 0 8px ${color}40)`,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className="text-2xl font-bold font-mono"
          style={{ color }}
        >
          {Math.round(progress)}%
        </span>
        <span className="text-[10px] text-gray-500 font-mono mt-1">uploading</span>
      </div>
    </div>
  );
}
