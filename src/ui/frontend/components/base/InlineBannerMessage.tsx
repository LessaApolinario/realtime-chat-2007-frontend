"use client";

interface InlineBannerMessageProps {
  type: "success" | "error";
  text: string;
}

export function InlineBannerMessage({ type, text }: InlineBannerMessageProps) {
  const classNames = {
    success: "bg-green-700/50",
    error: "bg-red-700/50",
  };

  return (
    <div
      className={`${classNames[type] ?? ""} rounded-md p-2 text-center text-red-200`}
    >
      {text}
    </div>
  );
}
