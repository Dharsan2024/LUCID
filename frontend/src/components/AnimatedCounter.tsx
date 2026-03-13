import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
}

export default function AnimatedCounter({ value, duration = 800, decimals = 0 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(value * progress * Math.pow(10, decimals)) / Math.pow(10, decimals);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value, duration, decimals]);

  return (
    <span className={displayValue !== value ? 'counter-update' : ''}>
      {displayValue.toFixed(decimals)}
    </span>
  );
}
