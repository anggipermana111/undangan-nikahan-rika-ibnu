interface WatercolorHeaderProps {
  className?: string;
}

export default function WatercolorHeader({ className = '' }: WatercolorHeaderProps) {
  return (
    <img
      src="/themes/forest/watercolor-top.webp"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 z-0 w-full object-cover object-top ${className}`}
    />
  );
}
