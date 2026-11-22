interface LeafCornersProps {
  className?: string;
}

export default function LeafCorners({ className = '' }: LeafCornersProps) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 ${className}`}>
      <img
        src="/themes/forest/leaf-left.webp"
        alt=""
        aria-hidden="true"
        className="absolute bottom-6 left-0 w-28 origin-bottom-left animate-sway"
      />
      <img
        src="/themes/forest/leaf-right.webp"
        alt=""
        aria-hidden="true"
        className="absolute bottom-6 right-0 w-28 origin-bottom-right animate-sway"
      />
    </div>
  );
}
