interface ProgressBarProps {
  progress: number;
  height?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ progress, height = 'h-2', showLabel = false }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className={`w-full glass rounded-full overflow-hidden ${height}`}>
        <div
          className="h-full gradient-button transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      {showLabel && (
        <p className="text-sm text-gray-600 mt-1 text-right">{Math.round(progress)}%</p>
      )}
    </div>
  );
}
