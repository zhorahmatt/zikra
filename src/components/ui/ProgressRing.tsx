"use client";

interface ProgressRingProps {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  onClick?: () => void;
}

export default function ProgressRing({
  current,
  total,
  size = 48,
  strokeWidth = 3,
  onClick,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? current / total : 0;
  const offset = circumference * (1 - progress);

  const inner = (
    <>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-color)"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary-green)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <span
        className="absolute text-xs font-semibold"
        style={{ color: "var(--text-secondary)", fontFamily: "Manrope" }}
      >
        {current}/{total}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        aria-label="Reset progress"
        className="relative inline-flex items-center justify-center rounded-full transition-opacity active:opacity-70"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      {inner}
    </div>
  );
}
