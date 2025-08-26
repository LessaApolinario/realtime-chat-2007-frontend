interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-solid border-t-transparent ${className ?? ""}`}
    ></div>
  );
}
