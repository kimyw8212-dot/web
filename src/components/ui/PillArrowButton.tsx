type PillArrowButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
};

export function PillArrowButton({
  label = "View More",
  onClick,
  className = "",
}: PillArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-3 rounded-full bg-white pl-6 pr-2 text-black transition hover:bg-white/90 ${className}`}
      style={{ height: "clamp(2.75rem, 3.177vw, 61px)" }}
    >
      <span style={{ fontSize: "clamp(0.875rem, 1.0417vw, 20px)" }}>{label}</span>
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-black text-white"
        style={{ width: "clamp(2.125rem, 2.1875vw, 42px)", height: "clamp(2.125rem, 2.1875vw, 42px)" }}
      >
        <svg width="40%" height="40%" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3 8H13M13 8L9 4M13 8L9 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
